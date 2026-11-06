const Database = require("better-sqlite3");

// Create Database
const db = new Database("swaralaya.db");

// Create Contact Table
db.exec(`
    CREATE TABLE IF NOT EXISTS contacts (

        id INTEGER PRIMARY KEY AUTOINCREMENT,

        name TEXT NOT NULL,

        email TEXT NOT NULL,

        message TEXT NOT NULL,

        created_at DATETIME DEFAULT CURRENT_TIMESTAMP

    )
`);

console.log("Database Connected Successfully!");

module.exports = db;