// Imports
const { openDatabase, closeDatabase } = require('./database.js');

// Helper functions
const handleRunError = (error) => {
    if (error) {
        console.log('Error: ', error);
    }
};

/**
 * Return all data related to a table that is passed in the url
 * 
 * @param {string} table - selecting table to retrieve data from in sqlite3 query
 * @param {response} response - providing feedback to requester
 */
const retrieveDataFromTable = (table, response) => {
    const db = openDatabase();
    const query = `SELECT * FROM ${table}`;

    db.all(query, (error, rows) => {
        if (error) {
            response.status(500).send('Internal server error');
        } else {
            response.status(200).send(rows);
        }

        closeDatabase(db);
    });
};

/**
 * Create new tables if they do not already exist in sqlite3 database
 * 
 * @param {response} response - providing feedback to user
 */
const createDefaultTables = (response) => {
    const db = openDatabase();

    const createCareersTableQuery = `
        CREATE TABLE IF NOT EXISTS Careers (
            id INTEGER PRIMARY KEY,
            dates TEXT,
            company TEXT,
            role TEXT,
            description TEXT
        );`;

    const createAchievementsTableQuery = `
        CREATE TABLE IF NOT EXISTS Achievements (
            id INTEGER PRIMARY KEY,
            date TEXT,
            type TEXT
        );`;

    const createRepositoriesTableQuery = `
        CREATE TABLE IF NOT EXISTS Repositories (
            id INTEGER PRIMARY KEY,
            name TEXT,
            languages TEXT,
            description TEXT
        );`;

    db.serialize(() => {
        db.run(createCareersTableQuery, handleRunError);
        db.run(createAchievementsTableQuery, handleRunError);
        db.run(createRepositoriesTableQuery, handleRunError);
        closeDatabase(db);
    });

    // Send success feedback to user
    response.status(200).send('Successfully executed table creation: Careers, Achievements, Repositories.');
};

/**
 * Insert request's body into database and use response to give feedback
 * 
 * @param {object} requestBody - Request's data/body containing table and relevant content to table
 * @param {object} response - Response is taken from express's default parameter to provde feedback to requester
 */
const insertEntry = (requestBody, response) => {
    try {
        const table = requestBody.table.toLowerCase();
        if (!requestBody || !table) {
            response.status(400).send('Bad request.');
        }

        const db = openDatabase();
        let insertQuery;

        switch (table) {
            case 'careers':
                insertQuery = `
                    INSERT INTO Careers (dates, company, role, description)
                    VALUES ('${requestBody.dates}', '${requestBody.company}',
                        '${requestBody.role}', '${requestBody.description}');`;
                break;

            case 'achievements':
                insertQuery = `
                    INSERT INTO Achievements (date, type)
                    VALUES ('${requestBody.date}', '${requestBody.type}')`;
                break;

            case 'repositories':
                insertQuery = `
                    INSERT INTO Repositories (name, languages, description)
                    VALUES ('${requestBody.name}', '${requestBody.languages}',
                        '${requestBody.description}')`;
                break;

            default:
                closeDatabase(db);
                response.status(400).send('Bad request.');
        }

        db.run(insertQuery, (error) => {
            if (error) {
                handleRunError(error);
                response.status(500).send('Internal server error');
            } else {
                response.status(200).send(`Successfully added entry to table ${table}.`);
            }

            // Callback
            closeDatabase(db);
        });
    } catch (error) {
        response.status(400).send('Bad request.');
    }
};

/**
 * Update an entry in the sqlite3 database using the id to find the record,
 * request's body to execute update and lastly use the response to provide
 * feedback to the requester.
 * 
 * @param {object} objectWithUpdate - object containing id, request's body and response to use in sqlite3 query
 */
const updateEntry = (objectWithUpdate) => {
    try {
        const id = objectWithUpdate.id;
        const requestBody = objectWithUpdate.requestBody;
        const table = objectWithUpdate.requestBody.table.toLowerCase();
        const response = objectWithUpdate.response;

        if (!id || !requestBody || !table) {
            response.status(400).send('Bad request.');
        }

        const db = openDatabase();
        let updateQuery;

        switch (table) {
            case 'careers':
                if (requestBody.dates && requestBody.company && requestBody.role && requestBody.description) {
                    updateQuery = `
                        UPDATE Careers
                        SET
                            dates = '${requestBody.dates}',
                            company = '${requestBody.company}',
                            role = '${requestBody.role}',
                            description = '${requestBody.description}'
                        WHERE id = ${id};`;
                    break;
                } else if (requestBody.dates && requestBody.company && requestBody.role) {
                    updateQuery = `
                        UPDATE Careers
                        SET
                            dates = '${requestBody.dates}',
                            company = '${requestBody.company}',
                            role = '${requestBody.role}'
                        WHERE id = ${id};`;
                    break;
                } else if (requestBody.dates && requestBody.company && requestBody.description) {
                    updateQuery = `
                        UPDATE Careers
                        SET
                            dates = '${requestBody.dates}',
                            company = '${requestBody.company}',
                            description = '${requestBody.description}'
                        WHERE id = ${id};`;
                    break;
                } else if (requestBody.dates && requestBody.role && requestBody.description) {
                    updateQuery = `
                        UPDATE Careers
                        SET
                            dates = '${requestBody.dates}',
                            role = '${requestBody.role}',
                            description = '${requestBody.description}'
                        WHERE id = ${id};`;
                    break;
                } else if (requestBody.company && requestBody.role && requestBody.description) {
                    updateQuery = `
                        UPDATE Careers
                        SET
                            company = '${requestBody.company}',
                            role = '${requestBody.role}',
                            description = '${requestBody.description}'
                        WHERE id = ${id};`;
                    break;
                } else if (requestBody.dates && requestBody.company) {
                    updateQuery = `
                        UPDATE Careers
                        SET
                            dates = '${requestBody.dates}',
                            company = '${requestBody.company}'
                        WHERE id = ${id};`;
                    break;
                } else if (requestBody.dates && requestBody.role) {
                    updateQuery = `
                        UPDATE Careers
                        SET
                            dates = '${requestBody.dates}',
                            role = '${requestBody.role}'
                        WHERE id = ${id};`;
                    break;
                } else if (requestBody.dates && requestBody.description) {
                    updateQuery = `
                        UPDATE Careers
                        SET
                            dates = '${requestBody.dates}',
                            description = '${requestBody.description}'
                        WHERE id = ${id};`;
                    break;
                } else if (requestBody.company && requestBody.role) {
                    updateQuery = `
                        UPDATE Careers
                        SET
                            company = '${requestBody.company}',
                            role = '${requestBody.role}'
                        WHERE id = ${id};`;
                    break;
                } else if (requestBody.company && requestBody.description) {
                    updateQuery = `
                        UPDATE Careers
                        SET
                            company = '${requestBody.company}',
                            description = '${requestBody.description}'
                        WHERE id = ${id};`;
                    break;
                } else if (requestBody.role && requestBody.description) {
                    updateQuery = `
                        UPDATE Careers
                        SET
                            role = '${requestBody.role}',
                            description = '${requestBody.description}'
                        WHERE id = ${id};`;
                    break;
                } else if (requestBody.dates) {
                    updateQuery = `
                        UPDATE Careers
                        SET
                            dates = '${requestBody.dates}'
                        WHERE id = ${id};`;
                    break;
                } else if (requestBody.company) {
                    updateQuery = `
                        UPDATE Careers
                        SET
                            company = '${requestBody.company}'
                        WHERE id = ${id};`;
                    break;
                } else if (requestBody.role) {
                    updateQuery = `
                        UPDATE Careers
                        SET
                            role = '${requestBody.role}'
                        WHERE id = ${id};`;
                    break;
                } else if (requestBody.description) {
                    updateQuery = `
                        UPDATE Careers
                        SET
                            description = '${requestBody.description}'
                        WHERE id = ${id};`;
                    break;
                } else {
                    closeDatabase(db);
                    response.status(400).send('Bad request.');
                    return;
                }

            case 'achievements':
                if (requestBody.date && requestBody.type) {
                    updateQuery = `
                        UPDATE Achievements
                        SET
                            date = '${requestBody.date}',
                            type = '${requestBody.type}'
                        WHERE id = ${id};`;
                    break;
                } else if (requestBody.date) {
                    updateQuery = `
                        UPDATE Achievements
                        SET
                            date = '${requestBody.date}'
                        WHERE id = ${id};`;
                    break;
                } else if (requestBody.type) {
                    updateQuery = `
                        UPDATE Achievements
                        SET
                            type = '${requestBody.type}'
                        WHERE id = ${id};`;
                    break;
                } else {
                    closeDatabase(db);
                    response.status(400).send('Bad request.');
                    return;
                }

            case 'repositories':
                if (requestBody.name && requestBody.languages && requestBody.description) {
                    updateQuery = `
                        UPDATE Repositories
                        SET
                            name = '${requestBody.name}',
                            languages = '${requestBody.languages}',
                            description = '${requestBody.description}'
                        WHERE id = ${id};`;
                    break;
                } else if (requestBody.name && requestBody.languages) {
                    updateQuery = `
                        UPDATE Repositories
                        SET
                            name = '${requestBody.name}',
                            languages = '${requestBody.languages}'
                        WHERE id = ${id};`;
                    break;
                } else if (requestBody.name && requestBody.description) {
                    updateQuery = `
                        UPDATE Repositories
                        SET
                            name = '${requestBody.name}',
                            description = '${requestBody.description}'
                        WHERE id = ${id};`;
                    break;
                } else if (requestBody.languages && requestBody.description) {
                    updateQuery = `
                        UPDATE Repositories
                        SET
                            languages = '${requestBody.languages}',
                            description = '${requestBody.description}'
                        WHERE id = ${id};`;
                    break;
                } else if (requestBody.name) {
                    updateQuery = `
                        UPDATE Repositories
                        SET
                            name = '${requestBody.name}'
                        WHERE id = ${id};`;
                    break;
                } else if (requestBody.languages) {
                    updateQuery = `
                        UPDATE Repositories
                        SET
                            languages = '${requestBody.languages}',
                        WHERE id = ${id};`;
                    break;
                } else if (requestBody.description) {
                    updateQuery = `
                        UPDATE Repositories
                        SET
                            description = '${requestBody.description}'
                        WHERE id = ${id};`;
                    break;
                } else {
                    closeDatabase(db);
                    response.status(400).send('Bad request.');
                    return;
                }

            default:
                closeDatabase(db);
                response.status(400).send('Bad request.');
                return;
        }

        const getByIdQuery = `SELECT * FROM ${table} WHERE id = ${id}`;

        db.get(getByIdQuery, (error, row) => {
            if (error) {
                closeDatabase(db);
                response.status(500).send('Internal server error.');
                return;
            }
        
            if (!row) {
                closeDatabase(db);
                response.status(404).send('Item not found.');
            } else {
                db.run(updateQuery, (error) => {
                    if (error) {
                        handleRunError(error);
                        closeDatabase(db);
                        response.status(500).send('Internal server error.');
                    } else {
                        closeDatabase(db);
                        response.status(200).send(`Successfully updated entry in table ${table}`);
                    }
                });
            }
        });
    } catch (error) {
        closeDatabase(db);
        response.status(400).send('Bad request.');
    }
};

/**
 * Remove an entry in sqlite3 database based on provided id and table from requester
 * 
 * @param {object} entryToRemove - contains id, table and response to use in sqlite3 query
 */
const removeEntryById = (entryToRemove) => {
    const db = openDatabase();
    const id = entryToRemove.id;
    const table = entryToRemove.table;
    const response = entryToRemove.response;
    const getByIdQuery = `SELECT * FROM ${table} WHERE id = ${id}`;
    const deleteByIdQuery = `DELETE FROM ${table} WHERE id = ${id}`;

    // Query the database to check if the item with the given ID exists
    db.get(getByIdQuery, (error, row) => {
        if (error) {
            closeDatabase(db);
            response.status(500).send('Internal server error');
            return;
        }

        if (!row) {
            closeDatabase(db);
            return response.status(404).send('Item not found.');
        } else {
            // If the record exists, delete it from the database
            db.run(deleteByIdQuery, (error) => {
                if (error) {
                    closeDatabase(db);
                    return response.status(500).send('Internal server error');
                } else {
                    closeDatabase(db);
                    response.status(200).send(`Successfully removed entry from table ${table}.`);
                }
            });
        }
    });
};

module.exports = {
    retrieveDataFromTable,
    createDefaultTables,
    insertEntry,
    updateEntry,
    removeEntryById,
};
