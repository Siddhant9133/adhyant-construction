const express = require('express');
const mysql = require('mysql2');
const cors = require('cors');
const app = express();
const port = 3000;

// Middleware
app.use(cors());
app.use(express.json());

// MySQL connection
const db = mysql.createConnection({
    host: 'localhost',
    user: 'root', // Replace with your MySQL username
    password: 'your_password', // Replace with your MySQL password
    database: 'adhyant_construction'
});

db.connect((err) => {
    if (err) {
        console.error('Error connecting to MySQL:', err);
        return;
    }
    console.log('Connected to MySQL database');
});

// API endpoint to handle form submission
app.post('/api/contact', (req, res) => {
    const { name, email, phone, service, message } = req.body;

    // Basic validation
    if (!name || !email) {
        return res.status(400).json({ error: 'Name and email are required' });
    }

    // Validate service against allowed values
    const validServices = ['Residential Construction', 'Commercial Construction', 'Architectural Design', 'Consultation'];
    if (service && !validServices.includes(service)) {
        return res.status(400).json({ error: 'Invalid service selected' });
    }

    const query = 'INSERT INTO contact_submissions (name, email, phone, service, message) VALUES (?, ?, ?, ?, ?)';
    db.query(query, [name, email, phone, service, message], (err, result) => {
        if (err) {
            console.error('Error saving form data:', err);
            return res.status(500).json({ error: 'Failed to save form data' });
        }
        res.status(200).json({ message: 'Form submitted successfully' });
    });
});

// Start the server
app.listen(port, () => {
    console.log(`Server running at http://localhost:${port}`);
});