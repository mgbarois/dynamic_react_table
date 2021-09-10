// Get all WTG coordinates for map
const getCoordinates = (req, res, db) => {
    db.select("*")
        .from("coordinates")
        .orderBy("id", "asc")
        .then(data => {
            res.json(data);
        })
        .catch(err => {
            console.log(err);
            res.status(400).json("Error")
        });
}

module.exports = {
    getCoordinates
}