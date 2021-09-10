const getProjects = (req, res, db) => {
    db.select("*")
        .from("projects")
        .orderBy("id", "desc")
        .then(data => {
            res.json(data);
        })
        .catch(err => {
            console.log(err);
            res.status(400).json("Error")
        });
}

const addProject = (req, res, db) => {
    db("projects")
        // Check for uniqueness contraint violations
        .where("project_name", req.body.project_name)
        .orWhere("project_number", req.body.project_number)
        .orWhere("number_3l_code", req.body.number_3l_code)
        .then((dups) => {
            if (dups.length > 0) {
                res.json("duplicate")
            }
            else {
                db("projects")
                    .insert(req.body)
                    .then(res.json("Sucessfully added."))
                    .catch(err => {
                        console.log(err);
                        res.status(400).json(err)
                    });
            }
        });
}

const editProject = (req, res, db) => {
    const { id } = req.body;
    db("projects")
        .where("id", id)
        .update(req.body)
        .then(res.json("Sucessfully edited."))
        .catch(err => {
            console.log(err);
            res.status(400).json("Error")
        });
}

const deleteProject = (req, res, db) => {
    const { id } = req.body;
    db("projects")
        .where("id", id)
        .del()
        .then(res.json("Sucessfully deleted."))
        .catch(err => {
            console.log(err);
            res.status(400).json("Error")
        });
}

module.exports = {
    getProjects,
    addProject,
    editProject,
    deleteProject
}