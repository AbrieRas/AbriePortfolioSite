/* Ideas
  - Create a master page with all skills
    (drop-downs on skills when clicked)
  - Create an admin page to create a smaller
    more specific page for a job application.
    also add redirect link to main page
  - Browse pages to find personal feel
  - Store data in sqlite3 for quick access
*/

// Libraries
const express = require('express');
const path = require('path');

// Imports
const { authenticate } = require('./data/helpers.js');
const { retrieveDataFromTable, createDefaultTables, insertEntry, updateEntry,
    removeEntryById, idExistsInTable } = require('./data/databaseHelpers.js');

const app = express();
const port = process.env.PORT || 3000; // Use the port provided by the environment or default to 3000

// Serve static files from the "public" directory
app.use(express.static(path.join(__dirname, 'public')));

// Parse incoming JSON data in the request body
app.use(express.json());

/*
[ WORKING ]
curl "http://localhost:3000/ping"
*/
app.get('/ping', (request, response) => {
    response.status(200).send('Pong!');
});

/*
[ WORKING ]
curl "http://localhost:3000/retrieve/Careers"
curl "http://localhost:3000/retrieve/Achievements"
curl "http://localhost:3000/retrieve/Repositories"
*/
app.get('/retrieve/:table', (request, response) => {
    const table = request.params.table;

    console.log('Requesting on table:', table);

    retrieveDataFromTable(table, response);
});

/*
[ WORKING ]
curl -H "Authorization: 123 123" -H "Content-Type: application/json" "http://localhost:3000/create"
*/
app.get('/create', authenticate, (request, response) => {
    createDefaultTables(response);
});

/*
[ WORKING ]
curl -X POST -H "Authorization: 123 123" -H "Content-Type: application/json" -d "{\"table\":\"Careers\",\"dates\": \"2023-10-10\", \"company\": \"Example Corp\", \"role\": \"Software Engineer\", \"description\": \"Working on exciting projects\"}" "http://localhost:3000/add"
curl -X POST -H "Authorization: 123 123" -H "Content-Type: application/json" -d "{\"table\":\"Achievements\",\"date\": \"2023-10-10\", \"type\": \"Example Corp\"}" "http://localhost:3000/add"
curl -X POST -H "Authorization: 123 123" -H "Content-Type: application/json" -d "{\"table\":\"Repositories\",\"name\": \"2023-10-10\", \"languages\": \"Example Corp, Example Corp, Example Corp\", \"description\": \"Software Engineer\"}" "http://localhost:3000/add"
*/
app.post('/add', (request, response) => {
    insertEntry(request.body, response);
});

/*
[ TESTING ]
curl -X PUT -H "Authorization: 123 123" -H "Content-Type: application/json" -d "{\"table\":\"Achievements\",\"date\": \"test1\", \"type\": \"test1\"}" "http://localhost:3000/edit/1"
curl -X PUT -H "Authorization: 123 123" -H "Content-Type: application/json" -d "{\"table\":\"Achievements\",\"date\": \"test2\"}" "http://localhost:3000/edit/1"
curl -X PUT -H "Authorization: 123 123" -H "Content-Type: application/json" -d "{\"table\":\"Achievements\",\"type\": \"test3\"}" "http://localhost:3000/edit/1"
*/
app.put('/edit/:id', authenticate, (request, response) => {
    const objectWithUpdate = {
        id: parseInt(request.params.id),
        requestBody: request.body,
        response: response,
    };

    // Query the database to check if the item with the given ID exists
    if (!idExistsInTable(objectWithUpdate)) {
        console.log('test:',idExistsInTable(objectWithUpdate));
        return;
    }

    // updateEntry(objectWithUpdate);
});

/*
[ TESTING ]
curl "http://localhost:3000/ping/"
*/
app.delete('/remove/:id', authenticate, (request, response) => {
    const entryToRemove = {
        id: request.params.id,
        table: request.body.table,
        response: response,
    };

    removeEntryById(entryToRemove);
});

// Start the server
app.listen(port, () => {
    console.log(`Server is running on port ${port}`);
});
