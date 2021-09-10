import React, { useState, useEffect } from "react";
import './App.scss';
import { Card, Table } from 'react-bootstrap';
import Navigation from './components/Navigation';
import SignInPage from './components/SignInPage';
import TableRow from './components/TableRow';
import VisualData from './components/VisualData';
import turbine from "./wind-power_white.png";

const headers = [
  "Id",
  "Name",
  "Number",
  "Acquisition",
  "3l",
  "Deal",
  "Group",
  "Status",
  "Company",
  "WTGs",
  "kWs",
  "Months",
  ""
]
function App() {

  const [loggedIn, setLoggedIn] = useState(true);
  const [projects, setProjects] = useState([]);

  const newProject = {
    project_name: '',
    project_number: '',
    acquisition_date: new Date().toISOString().substring(0, 10),
    number_3l_code: '',
    project_deal_type_id: 'Asset',
    project_group_id: 'RW 1',
    project_status_id: '1 Operating',
    company_id: 0,
    WTG_numbers: '',
    kWs: 0,
    months_acquired: 0
  }

  // Handle login
  const onLogin = (status) => {
    setLoggedIn(status);
  }

  const onLogout = () => {
    onLogin(false);
  }

  // Get project data on page load
  useEffect(() => {
    fetch("http://localhost:3001/api/projects")
      .then((resp) => resp.json())
      .then((data) => {
        setProjects(data);
      })
      .catch((err) => console.log(err));
  }, []);

  return (
    <div className="App">
      {loggedIn ?
      // Return table and visial data if logged in
        <>
          <Card className="project-card">
            <Navigation onLogout={onLogout} />
            <Card.Title><img src={turbine} alt="wind turbine" />Wind Farm Projects</Card.Title>
            <Card.Body>
              <Table className="projects-table">
                <thead>
                  <tr>
                    {
                      headers.map((col, i) => {
                        return (
                          <th key={i} style={{ verticalAlign: "middle", textAlign: "center" }}>{col}</th>
                        )
                      })
                    }
                  </tr>
                </thead>
                <tbody>
                  <TableRow allProjects={projects} project={newProject} mode="add" setProjects={setProjects} />
                  {
                    projects.map((project, i) => {
                      return (<TableRow
                        key={i}
                        allProjects={projects}
                        project={project}
                        mode="readonly"
                        setProjects={setProjects} />)
                    })
                  }
                </tbody>
              </Table>
            </Card.Body>
          </Card>
          <VisualData projects={projects} />
        </>
        // Return signin page if not logged in
        : <SignInPage onLogin={onLogin} />
      }
    </div >
  );
}

export default App;
