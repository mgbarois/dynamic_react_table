const express = require('express');
const cors = require('cors');
const knex = require('knex');

const { resetProjects, resetCoordinates } = require('./controllers/dbHandler');
const { getProjects, addProject, editProject, deleteProject } = require('./controllers/projectHandler');
const { getCoordinates } = require('./controllers/coordinatesHandler');

const db = knex({
  client: "pg",
  connection: {
    host: "127.0.0.1",
    user: "postgres",
    password: "postgres",
    database: "qdb",
  },
});

const app = express();
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(cors());

// DB endpoints
app.get('/api/resetProjects', (req, res) => { resetProjects(req, res, db) });

app.get('/api/resetCoordinates', (req, res) => { resetCoordinates(req, res, db) });

// Projects endpoints
app.get('/api/projects', (req, res) => { getProjects(req, res, db) });

app.post('/api/projects', (req, res) => { addProject(req, res, db) });

app.put('/api/projects', (req, res) => { editProject(req, res, db) });

app.delete('/api/projects', (req, res) => { deleteProject(req, res, db) });

// Coordinates endpoint
app.get('/api/coordinates', (req, res) => { getCoordinates(req, res, db) });

app.listen(process.env.PORT || 3001, () => {
    console.log(`App is runnin on port 3001`);
}) 
