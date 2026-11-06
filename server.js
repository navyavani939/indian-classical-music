const express = require("express");
const db = require("./db");
const path = require("path");

const app = express();
const PORT = 3000;

app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.use(express.static(__dirname));

app.get("/", (req, res) => {
    res.sendFile(path.join(__dirname, "index.html"));
});

// Save Contact
app.post("/api/contact", (req, res) => {
    const { name, email, message } = req.body;

    if (!name || !email || !message) {
        return res.status(400).json({
            success: false,
            message: "Please fill all details"
        });
    }

    try {
        const query = db.prepare(`
            INSERT INTO contacts (name, email, message)
            VALUES (?, ?, ?)
        `);

        query.run(name, email, message);

        res.json({
            success: true,
            message: "Your message saved successfully!"
        });

    } catch (error) {
        console.log(error);

        res.status(500).json({
            success: false,
            message: "Database Error"
        });
    }
});

// Display Contacts
app.get("/api/contacts", (req, res) => {
    const contacts = db.prepare(
        "SELECT * FROM contacts ORDER BY id DESC"
    ).all();

    res.json(contacts);
});

// Start Server
app.listen(PORT, () => {
    console.log(`Swaralaya Website Running: http://localhost:${PORT}`);
});