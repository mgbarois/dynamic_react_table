import React, { useState, useEffect } from "react";
import TableCell from './TableCell'
import { Button } from 'react-bootstrap';

const TableRow = ({ allProjects, project, mode, setProjects }) => {

    const [editMode, setEditMode] = useState(((mode === "edit") || (mode === "add")) ? true : false);
    const [projectData, setProjectData] = useState([]);

    useEffect(() => {
        setProjectData(project)
    }, [project]);

    const onEdit = () => {
        setEditMode(true);
    }

    const calcMonths = (date) => {
        const acqu = new Date(date);
        const today = new Date(Date.now());
        return (today.getFullYear() - acqu.getFullYear()) * 12 + (today.getMonth() - acqu.getMonth())
    }

    // Automatically calculate months on acquisition date input change
    const onDateChanged = (e) => {
        setProjectData((prevState) => ({
            ...prevState,
            months_acquired: calcMonths(e.target.value)
        }));
        // const modified = allProjects.map(obj => {
        //     if (obj.id === project.id) {
        //         obj.months_acquired = calcMonths(e.target.value);
        //     }
        //     return obj;
        // })
        // setProjects(modified)
        onItemChanged(e);
    }

    // Restrict 3l field to only uppercase letters
    const on3lChanged = (e) => {
        e.target.value = e.target.value.toUpperCase();
        e.target.value = e.target.value.replace(/[\W\d]/, "");
        onItemChanged(e);
    }

    const onItemChanged = (e) => {
        setProjectData((prevState) => ({
            ...prevState,
            [e.target.name]: e.target.value
        }));
        // https://stackoverflow.com/questions/54150783/react-hooks-usestate-with-object
    }

    const validateInputs = () => {
        const errors = [];
        if (projectData.project_name === "") {
            errors.push("Project Name")
        }
        if (projectData.project_number === "") {
            errors.push("Project Number")
        }
        if (projectData.number_3l_code === "") {
            errors.push("3l Code")
        }
        if (Number(projectData.company_id) === 0) {
            errors.push("Company Id")
        }
        return errors;
    }

    // Save updated project data to db and update project list
    const onSave = () => {
        const errors = validateInputs();
        if (errors.length > 0) {
            alert("Please fill the following fields before saving the project:\n" +
                errors.map((err) => "\n\u2022 " + err));
        }
        else {
            fetch(`http://localhost:3001/api/projects`, {
                method: "put",
                headers: { "Content-type": "application/json" },
                body: JSON.stringify(projectData),
            })
                .then(() => {
                    setEditMode(false);
                    // Not re-fetching project list from db, do not disrupt any potential rows in edit mode
                    setProjects(allProjects.map(obj => {
                        if (obj.id === projectData.id) {
                            obj = projectData
                        }
                        return obj;
                    }))
                })
                .catch((err) => console.log(err));
        }
    }

    const onDelete = () => {
        fetch(`http://localhost:3001/api/projects/`, {
            method: "delete",
            headers: { "Content-type": "application/json" },
            body: JSON.stringify({
                id: project.id,
            }),
        })
            .then(() => {
                // Not re-fetching project list from db, do not disrupt any potential rows in edit mode
                setProjects(allProjects.filter((proj) => {
                    return proj.id !== project.id;
                }));
            })
            .catch((err) => alert(err));
    }

    const onAdd = () => {
        const errors = validateInputs();
        if (errors.length > 0) {
            alert("Please fill the following fields before adding the project:\n" +
                errors.map((err) => "\n\u2022 " + err));
        }
        else {
            fetch(`http://localhost:3001/api/projects`, {
                method: "post",
                headers: { "Content-type": "application/json" },
                body: JSON.stringify(projectData),
            })
                .then((resp) => resp.json())
                .then((data) => {
                    if (data === "duplicate") {
                        alert("All project names, project numbers, and 3l codes must be unique.")
                    }
                    else {
                        // Fetching in order to get initialized/incremented proj id
                        fetch("http://localhost:3001/api/projects")
                            .then((resp) => resp.json())
                            .then((data) => {
                                setProjects(data);
                            })
                            .catch((err) => console.log(err));
                    }
                })
                .catch((err) => console.log(err));
        }
    }

    // Configure control buttons based on mode
    const controlButtons = () => {
        if (mode === "add") {
            return (<div className="controls"><Button className="add-button" onClick={onAdd}><i className="fas fa-plus" /></Button></div>);
        }
        else if (editMode) {
            return (<div className="controls"><Button onClick={onSave}><i className="fas fa-save" /></Button></div>);
        }
        else {
            return (<>
                <div className="controls">
                    <Button onClick={onEdit}><i className="fas fa-edit" /></Button>
                    <Button onClick={onDelete}><i className="fas fa-trash" /></Button>
                </div>
            </>);
        }
    }

    return (
        <tr className={(mode === "add") ? "add-project" : ""}>
            <td>{project.id}</td>
            <TableCell
                name="project_name"
                value={projectData.project_name}
                type="text"
                editable={editMode}
                onItemChanged={onItemChanged}
                style={{ width: "130px", fontWeight: "bold" }} />
            <TableCell
                name="project_number"
                value={projectData.project_number}
                type="text"
                editable={editMode}
                onItemChanged={onItemChanged}
                maxLength="5"
                style={{ width: "45px" }} />
            <TableCell
                name="acquisition_date"
                value={projectData.acquisition_date}
                type="date"
                editable={editMode}
                onItemChanged={onDateChanged}
                style={{ width: "125px" }} />
            <TableCell
                name="number_3l_code"
                value={projectData.number_3l_code}
                type="text"
                editable={editMode}
                onItemChanged={on3lChanged}
                maxLength="3"
                style={{ width: "40px" }} />
            <TableCell
                name="project_deal_type_id"
                value={projectData.project_deal_type_id}
                type="select"
                editable={editMode}
                onItemChanged={onItemChanged}
                options={["Share", "Asset"]} />
            <TableCell
                name="project_group_id"
                value={projectData.project_group_id}
                type="select"
                editable={editMode}
                onItemChanged={onItemChanged}
                style={{ width: "40px" }}
                options={["RW1", "QE 4"]} />
            <TableCell value={projectData.project_status_id}
                name="project_status_id"
                type="select"
                editable={editMode}
                onItemChanged={onItemChanged}
                style={{ width: "60px" }}
                options={["1 Operating", "2 DD"]} />
            <TableCell
                name="company_id"
                value={projectData.company_id}
                type="number"
                editable={editMode}
                onItemChanged={onItemChanged}
                maxLength="2"
                style={{ width: "40px" }} />
            <TableCell
                name="WTG_numbers"
                value={projectData.WTG_numbers}
                type="textarea"
                editable={editMode}
                onItemChanged={onItemChanged}
                style={{ width: "180px" }}
            />
            <TableCell
                name="kWs"
                value={projectData.kWs}
                type="number"
                editable={editMode}
                onItemChanged={onItemChanged}
                style={{ width: "60px" }} />
            <td>{project.months_acquired}</td>
            <td>{controlButtons()}</td>

        </tr>
    )
}

export default TableRow;