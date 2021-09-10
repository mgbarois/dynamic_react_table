# Fullstack Development Test

##  Part 1 - Data processing

|   |   |
|---|---|
| **Source** | `1_data_processing/process_tables.py` |
| **Language** | Python |
| **Frameworks & Packages** | pandas, openpyxl |

Run:
```
$ cd 1_data_processing
$ python process_tables.py
```

The resulting Project Table View be saved as `1_data_processing/Exports/project_table_view.xlsx`.

## Part 2 - Backend


|   |   |
|---|---|
| **Source** | `2_backend/server.js` & `2_backend/controllers` folder |
| **Language** | Javascript |
| **Frameworks & Packages** | NodeJS, ExpressJS, Knex, SheetJS |
| **Database** | local PostgreSQL db |

*Requirements:* 
* Local postgres database called `qdb`. Connection data can be changed in the `db` variable in `server.js`.

### Run:
```
$ cd 2_backend
$ npm install
$ npm start
```
The local server will start on port `3001`.

*Note:* API endpoints `/api/resetProjects` and `/api/resetCoordinates` each need to be hit once to load the project and coordinate data into the db.

## Part 3 - Frontend

|   |   |
|---|---|
| **Source** | `3_frontend` folder |
| **Language** | Javascript |
| **Frameworks & Packages** | React, React Bootstrap, Google Maps React, Chart.js |

```
$ cd 3_frontend
$ npm install
$ npm start
```
The local server will start on port `3000`.

*Requirements:* 

In order for the map to display properly, create a `3_frontend/.env` file and add your API key like this: `REACT_APP_GOOGLE_MAPS_API_KEY=xxx`

## Future improvements

**Frontend**
- Make table responsive
- Improve errors and warnings (currently just window alerts)
- Add operation confirmation (ex. highlighting, animations, modals to show project was correctly added or edited)
- Add search functionality
- Change WTG cells to manipulatable badge lists
- Manage console warnings (mostly map-related)

**Backend**
- Add backend layer of input validation (ex. null inputs, incorrect form)
- Improve unique key violation handling
- Add testing (with BDD / TDD assertion library)

**Both**
- Add functionality to log in page
- Fix bug: If user adds a new row before saving edits another one, edits are lost