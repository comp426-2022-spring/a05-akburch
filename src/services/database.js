// Put your database code here
// databasing
const database = require('better-sqlite3');
const fs = require('fs');
const datadir = './data/';

if (!fs.existsSync(datadir)){
    fs.mkdirSync(datadir);
}

const db = new Database('log.db');

// Is the database initialized or do we need to initialize it?
const stmt = db.prepare(`
    SELECT name FROM sqlite_master WHERE type='table' and name='access';`
    );

let row = stmt.get();

if (row === undefined) {
    console.log('Your database appears to be empty. I will initialize it now.');

// Set a const that will contain your SQL commands to initialize the database.
    const sqlInit = `
        CREATE TABLE access (id INTEGER PRIMARY KEY, remoteaddr TEXT, 
            remoteuser TEXT, time TEXT, method TEXT, url TEXT, 
            protocol TEXT, httpversion NUMERIC, status INTEGER, 
            referer TEXT, useragent TEXT);
    `;

    db.exec(sqlInit);

} else {
    console.log('Database exists.')
}

module.exports = db