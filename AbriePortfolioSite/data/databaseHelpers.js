// Helper functions
const handleRunError = (error) => {
    response.status(500).send('Internal server error.');
};

/**
 * Insert request's body into database and use response to give feedback
 * 
 * @param {object} requestBody - Request's data/body containing table and relevant content to table
 * @param {object} response - Response is taken from express's default parameter
 * @returns {response} - Feedback on the requestor's request
 */
const insertEntry = (requestBody, response) => {
    try {
        const table = requestBody.table.toLowerCase();
        if (!requestBody || !table) {
            response.status(400).send('Bad request.');
        }

        switch (table) {
            case 'careers':
                db.run(
                    `INSERT INTO Careers (dates, company, role, description)
                    VALUES (${requestBody.dates}, ${requestBody.company},
                        ${requestBody.role}, ${requestBody.description});`,
                    handleRunError
                );
                break;
            case 'achievements':
                db.run(
                    `INSERT INTO Achievements (date, type)
                    VALUES (${requestBody.date}, ${requestBody.type})`,
                    handleRunError
                );
                break;
            case 'repositories':
                db.run(
                    `INSERT INTO Repositories (name, languages, description)
                    VALUES (${requestBody.name}, ${requestBody.languages},
                        ${requestBody.description})`,
                    handleRunError
                );
                break;
            default:
                response.status(400).send('Bad request.');
        }
        response.status(200).send(`Successfully added entry to table ${table}.`);
    } catch (error) {
        response.status(400).send('Bad request.');
    }
};

/**
 * Update an entry in the sqlite3 database using the id to find the record,
 * request's body to execute update and lastly use the response to provide
 * feedback to the requester.
 * 
 * @param {object} objectWithUpdate - object containing id, request's body and response
 * @returns {response} - provide feedback to requester
 */
// const updateEntry = (id, requestBody, response) => {
const updateEntry = (objectWithUpdate) => {
    try {
        const id = objectWithUpdate.id;
        const requestBody = objectWithUpdate.requestBody;
        const table = objectWithUpdate.requestBody.table.toLowerCase();
        const response = objectWithUpdate.response;

        if (!id || !requestBody || !table) {
            response.status(400).send('Bad request.');
        }

        switch (table) {
            case 'careers':
                if (requestBody.dates && requestBody.company && requestBody.role && requestBody.description) {
                    db.run(
                        `UPDATE Careers
                        SET
                          dates = '${requestBody.dates}',
                          company = '${requestBody.company}',
                          role = '${requestBody.role}',
                          description = '${requestBody.description}'
                        WHERE id = ${id};`,
                        handleRunError);
                    break;
                } else if (requestBody.dates && requestBody.company && requestBody.role) {
                    db.run(
                        `UPDATE Careers
                        SET
                          dates = '${requestBody.dates}',
                          company = '${requestBody.company}',
                          role = '${requestBody.role}'
                        WHERE id = ${id};`,
                        handleRunError);
                    break;
                } else if (requestBody.dates && requestBody.company && requestBody.description) {
                    db.run(
                        `UPDATE Careers
                        SET
                          dates = '${requestBody.dates}',
                          company = '${requestBody.company}',
                          description = '${requestBody.description}'
                        WHERE id = ${id};`,
                        handleRunError);
                    break;
                } else if (requestBody.dates && requestBody.role && requestBody.description) {
                    db.run(
                        `UPDATE Careers
                        SET
                          dates = '${requestBody.dates}',
                          role = '${requestBody.role}',
                          description = '${requestBody.description}'
                        WHERE id = ${id};`,
                        handleRunError);
                    break;
                } else if (requestBody.company && requestBody.role && requestBody.description) {
                    db.run(
                        `UPDATE Careers
                        SET
                          company = '${requestBody.company}',
                          role = '${requestBody.role}',
                          description = '${requestBody.description}'
                        WHERE id = ${id};`,
                        handleRunError);
                    break;
                } else if (requestBody.dates && requestBody.company) {
                    db.run(
                        `UPDATE Careers
                        SET
                          dates = '${requestBody.dates}',
                          company = '${requestBody.company}'
                        WHERE id = ${id};`,
                        handleRunError);
                    break;
                } else if (requestBody.dates && requestBody.role) {
                    db.run(
                        `UPDATE Careers
                        SET
                          dates = '${requestBody.dates}',
                          role = '${requestBody.role}'
                        WHERE id = ${id};`,
                        handleRunError);
                    break;
                } else if (requestBody.dates && requestBody.description) {
                    db.run(
                        `UPDATE Careers
                        SET
                          dates = '${requestBody.dates}',
                          description = '${requestBody.description}'
                        WHERE id = ${id};`,
                        handleRunError);
                    break;
                } else if (requestBody.company && requestBody.role) {
                    db.run(
                        `UPDATE Careers
                        SET
                          company = '${requestBody.company}',
                          role = '${requestBody.role}'
                        WHERE id = ${id};`,
                        handleRunError);
                    break;
                } else if (requestBody.company && requestBody.description) {
                    db.run(
                        `UPDATE Careers
                        SET
                          company = '${requestBody.company}',
                          description = '${requestBody.description}'
                        WHERE id = ${id};`,
                        handleRunError);
                    break;
                } else if (requestBody.role && requestBody.description) {
                    db.run(
                        `UPDATE Careers
                        SET
                          role = '${requestBody.role}',
                          description = '${requestBody.description}'
                        WHERE id = ${id};`,
                        handleRunError);
                    break;
                } else if (requestBody.dates) {
                    db.run(
                        `UPDATE Careers
                        SET
                          dates = '${requestBody.dates}'
                        WHERE id = ${id};`,
                        handleRunError);
                    break;
                } else if (requestBody.company) {
                    db.run(
                        `UPDATE Careers
                        SET
                          company = '${requestBody.company}'
                        WHERE id = ${id};`,
                        handleRunError);
                    break;
                } else if (requestBody.role) {
                    db.run(
                        `UPDATE Careers
                        SET
                          role = '${requestBody.role}'
                        WHERE id = ${id};`,
                        handleRunError);
                    break;
                } else if (requestBody.description) {
                    db.run(
                        `UPDATE Careers
                        SET
                          description = '${requestBody.description}'
                        WHERE id = ${id};`,
                        handleRunError);
                    break;
                } else {
                    response.status(400).send('Bad request.');
                    break;
                }

            case 'achievements':
                if (requestBody.date && requestBody.type) {
                    db.run(
                        `UPDATE Achievements
                        SET
                          date = '${requestBody.date}',
                          type = '${requestBody.type}'
                        WHERE id = ${id};`,
                        handleRunError);
                    break;
                } else if (requestBody.date) {
                    db.run(
                        `UPDATE Achievements
                        SET
                          date = '${requestBody.date}'
                        WHERE id = ${id};`,
                        handleRunError);
                    break;
                } else if (requestBody.type) {
                    db.run(
                        `UPDATE Achievements
                        SET
                          type = '${requestBody.type}'
                        WHERE id = ${id};`,
                        handleRunError);
                    break;
                } else {
                    response.status(400).send('Bad request.');
                    break;
                }

            case 'repositories':
                if (requestBody.name && requestBody.languages && requestBody.description) {
                    db.run(
                        `UPDATE Repositories
                        SET
                          name = '${requestBody.name}',
                          languages = '${requestBody.languages}',
                          description = '${requestBody.description}'
                        WHERE id = ${id};`,
                        handleRunError);
                    break;
                } else if (requestBody.name && requestBody.languages) {
                    db.run(
                        `UPDATE Repositories
                        SET
                          name = '${requestBody.name}',
                          languages = '${requestBody.languages}'
                        WHERE id = ${id};`,
                        handleRunError);
                    break;
                } else if (requestBody.name && requestBody.description) {
                    db.run(
                        `UPDATE Repositories
                        SET
                          name = '${requestBody.name}',
                          description = '${requestBody.description}'
                        WHERE id = ${id};`,
                        handleRunError);
                    break;
                } else if (requestBody.languages && requestBody.description) {
                    db.run(
                        `UPDATE Repositories
                        SET
                          languages = '${requestBody.languages}',
                          description = '${requestBody.description}'
                        WHERE id = ${id};`,
                        handleRunError);
                    break;
                } else if (requestBody.name) {
                    db.run(
                        `UPDATE Repositories
                        SET
                          name = '${requestBody.name}'
                        WHERE id = ${id};`,
                        handleRunError);
                    break;
                } else if (requestBody.languages) {
                    db.run(
                        `UPDATE Repositories
                        SET
                          languages = '${requestBody.languages}',
                        WHERE id = ${id};`,
                        handleRunError);
                    break;
                } else if (requestBody.description) {
                    db.run(
                        `UPDATE Repositories
                        SET
                          description = '${requestBody.description}'
                        WHERE id = ${id};`,
                        handleRunError);
                    break;
                } else {
                    response.status(400).send('Bad request.');
                    break;
                }
            default:
                response.status(400).send('Bad request.');
        }
    } catch (error) {
        response.status(400).send('Bad request.');
    }

    response.status(200).send(`Successfully updated entry in table ${table}`);
};

module.exports = {
    insertEntry,
    updateEntry
};
