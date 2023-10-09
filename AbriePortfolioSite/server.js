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
const db = require('./data/database.js');
const { authenticate } = require('./data/helpers.js');
const { insertEntry, updateEntry } = require('./data/databaseHelpers.js');

const app = express();
const port = process.env.PORT || 3000; // Use the port provided by the environment or default to 3000

// Serve static files from the "public" directory
app.use(express.static(path.join(__dirname, 'public')));

// Parse incoming JSON data in the request body
app.use(express.json());

app.get('/ping', (request, response) => {
    response.status(200).send('Pong!');
});

app.get('/retrieve/:table', (request, response) => {
    const table = request.params.word;

    db.all(`SELECT * FROM ${table}`, (error, rows) => {
        if (error) {
            // Handle database error
            return response.status(500).send('Internal server error');
        }

        // Respond with the rows retrieved from the database
        response.status(200).json(rows);
    });
});

app.get('/create', authenticate, (request, response) => {
    // Create default tables
    db.run(
        `CREATE TABLE IF NOT EXISTS Careers (
        id INTEGER PRIMARY KEY,
        dates TEXT,
        company TEXT,
        role TEXT,
        description TEXT
    );`, error => {
        response.status(500).send('An error occurred creating Careers table:', error);
    });

    db.run(
        `CREATE TABLE IF NOT EXISTS Achievements (
        id INTEGER PRIMARY KEY,
        date TEXT,
        type TEXT
    );`, error => {
        response.status(500).send('An error occurred creating Achievements table:', error);
    });

    db.run(
        `CREATE TABLE IF NOT EXISTS Repositories (
        id INTEGER PRIMARY KEY,
        name TEXT,
        languages TEXT,
        description TEXT
    );`, error => {
        response.status(500).send('An error occurred creating Repositories table:', error);
    });

    response.status(200).send('Successfully executed tables: Careers, Achievements, Repositories.');
});

/*
curl -X POST -H "Authorization: 123 123" -H "Content-Type: application/json" -d "{\"table\":\"careers\",\"testing\":\"y'\u0027es\"}" "https://abrie.glitch.me/add"
*/
app.post('/add', (request, response) => {
    insertEntry(request.body, response);
});

app.put('/edit/:id', authenticate, (request, response) => {
    const idToUpdate = parseInt(request.params.id);
    const entryWithUpdate = request.body;

    // Query the database to check if the item with the given ID exists
    db.get(`SELECT * FROM ${entryWithUpdate.table} WHERE id = ${idToUpdate}`, (err, row) => {
        if (err) {
            // Handle database error
            return response.status(500).send('Internal server error.');
        }

        if (!row) {
            // If no record is found, respond with a 404 status
            return response.status(404).send('Item not found.');
        }
    });

    const objectWithUpdate = {
        id: idToUpdate,
        requestBody: entryWithUpdate,
        response: response,
    };

    updateEntry(objectWithUpdate);
});

app.delete('/remove/:id', authenticate, (request, response) => {
    const itemId = request.params.id;
    const table = request.body.table;

    // Query the database to check if the item with the given ID exists
    db.get(`SELECT * FROM ${table} WHERE id = ${itemId}`, (err, row) => {
        if (err) {
            return response.status(500).send('Internal server error');
        }

        if (!row) {
            return response.status(404).send('Item not found.');
        }

        // If the record exists, delete it from the database
        db.run(`DELETE FROM items WHERE id = ${itemId}`, (err) => {
            if (err) {
                return response.status(500).send('Internal server error');
            }

            response.status(200).send(`Successfully removed entry from table ${table}.`);
        });
    });
});

// Start the server
app.listen(port, () => {
    console.log(`Server is running on port ${port}`);
});
