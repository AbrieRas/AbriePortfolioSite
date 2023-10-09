/* Ideas
  - Create a master page with all skills
    (drop-downs on skills when clicked)
  - Create an admin page to create a smaller
    more specific page for a job application.
    also add redirect link to main page
  - Browse pages to find personal feel
*/

// Libraries
const express = require('express');
const path = require('path');

// Imports
const { authenticate, checkHeader } = require('./data/helpers.js');
const { retrieveDataFromTable, createDefaultTables, insertEntry, updateEntry,
    removeEntryById, idExistsInTable } = require('./data/databaseHelpers.js');

const app = express();
const port = process.env.PORT || 3000; // Use the port provided by the environment or default to 3000

// Serve static files from the "public" directory
app.use(express.static(path.join(__dirname, 'public')));

// Parse incoming JSON data in the request body
app.use(express.json());

app.get('/ping', checkHeader, (request, response) => {
    response.status(200).send('Pong!');
});

app.get('/retrieve/:table', checkHeader, (request, response) => {
    const table = request.params.table;

    retrieveDataFromTable(table, response);
});

app.get('/create', authenticate, (request, response) => {
    createDefaultTables(response);
});

app.post('/add', authenticate, (request, response) => {
    insertEntry(request.body, response);
});

app.put('/edit/:id', authenticate, (request, response) => {
    const objectWithUpdate = {
        id: parseInt(request.params.id),
        requestBody: request.body,
        response: response,
    };

    updateEntry(objectWithUpdate);
});

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
