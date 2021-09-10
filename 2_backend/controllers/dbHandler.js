const XLSX = require('xlsx');

const resetProjects = (req, res, db) => {

    // Recreate table on db
    db.schema.dropTableIfExists('projects')
        .then(() => {
            return db.schema.createTable('projects', table => {
                table.increments('id').unique().notNullable().primary();
                table.string('project_name').unique().notNullable();
                table.string('project_number').unique().notNullable();
                // table.timestamp('acquisition_date').defaultTo(db.fn.now());
                table.string('acquisition_date').notNullable();
                table.string('number_3l_code').unique().notNullable();
                table.string('project_deal_type_id').notNullable();
                table.string('project_group_id').notNullable();
                table.string('project_status_id').notNullable();
                table.string('company_id').notNullable();
                // table.specificType('WTG_numbers', 'text ARRAY').notNullable();
                table.string('WTG_numbers', 'text ARRAY').notNullable();
                table.integer('kWs').notNullable(); // Assuming integer
                table.integer('months_acquired').notNullable();
            })
        })
        .then(() => {
            // Fill with data from project_view_table.xlsx
            const wb = XLSX.readFile('./../1_data_processing/Exports/project_view_table.xlsx');
            const ws = wb.Sheets["Sheet1"];
            projects = XLSX.utils.sheet_to_json(ws);

            // Remove the dataframe id column, and project id column, convert wtg numbers to array
            projects.map(proj => {
                delete proj["__EMPTY"];
                // delete proj.id;
                // proj["acquisition_date"] = new Date(proj["acquisition_date"])
                proj.WTG_numbers = proj.WTG_numbers.replace(/;/g, ", ");
                return proj;
            })
            return db("projects")
                .insert(projects)
        })
        .then(() => res.json("Projets successfully reset."))
        .catch(err => {
            console.log(err);
            res.status(400).json("Error");
        })
}

const resetCoordinates = (req, res, db) => {

    // Recreate table on db
    db.schema.dropTableIfExists('coordinates')
        .then(() => {
            return db.schema.createTable('coordinates', table => {
                table.increments('id').unique().notNullable().primary();
                table.string('number').unique().notNullable();
                table.decimal('lat').notNullable();
                table.decimal('lng').notNullable();
            })
        })
        .then(() => {

            // Fill with coordinate data from WTG_raw_table.xlsx
            const wb = XLSX.readFile('./../1_data_processing/Exports/WTG_raw_table.xlsx');
            const ws = wb.Sheets["Sheet1"];
            wtgs = XLSX.utils.sheet_to_json(ws);

            const coordinates = wtgs.map(wtg => {
                return ({
                    number: wtg.WTG_number,
                    lat: wtg.WGS_84_north,
                    lng: wtg.WGS_84_east
                });
            })
            return db("coordinates")
                .insert(coordinates)
        })
        .then(() => res.json("Coordinates successfully reset."))
        .catch(err => {
            console.log(err);
            res.status(400).json("Error");
        })
}

module.exports = { resetProjects, resetCoordinates };