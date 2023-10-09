const sqlite3 = require('sqlite3');

const openDatabase = () => {
    return new sqlite3.Database('./data/database.sqlite');
};

const closeDatabase = (database) => {
    database.close((error) => {
        if (error) {
            console.error('Error closing the database:', error.message);
        }
    });
};

module.exports = {
    openDatabase,
    closeDatabase,
};
