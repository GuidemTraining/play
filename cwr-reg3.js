const express = require('express');
const fs = require('fs');
const path = require('path');
const cors = require('cors');
const app = express();
const port = 3000;

// Middleware to parse JSON request bodies
app.use(express.json());

// CORS configuration
const corsOptions = {
    origin: '*', // Adjust according to your needs
    methods: 'GET,POST',
    allowedHeaders: ['Content-Type', 'Authorization']
};

// Enable CORS using the configured options
app.use(cors(corsOptions));

const logFilePath = path.join(__dirname, 'cwr-reg-test.json');

// Function to validate input data
function isValidInput(input) {
    const validPattern = /^[a-zA-Z0-9-_,.@]+$/;
    return validPattern.test(input);
}

// Function to update log file with new data
function updateLogFile(data, res) {
    fs.writeFile(logFilePath, JSON.stringify(data, null, 2), 'utf8', (writeErr) => {
        if (writeErr) {
            console.error('Error writing file:', writeErr);
            return res.status(500).json({ message: 'Error writing data to file' });
        }
        res.status(200).json({ message: 'Data received and saved' });
    });
}

app.post('/users/cwr-reg', (req, res) => {
    const requestData = req.body;

    // Convert all properties to string and validate
    for (const key in requestData) {
        if (typeof requestData[key] !== 'string' || !isValidInput(requestData[key])) {
            return res.status(400).json({ message: `Invalid characters in ${key}` });
        }
    }

    // Read existing data and append new data
    fs.readFile(logFilePath, 'utf8', (readErr, data) => {
        let logData = {};

        if (!readErr && data) {
            logData = JSON.parse(data);
        }

        const { userId, userEmail } = requestData;
        if (!userId || !userEmail) {
            return res.status(400).json({ message: 'userId and userEmail are required' });
        }

        logData[userId] = logData[userId] || {};
        logData[userId][userEmail] = requestData;

        updateLogFile(logData, res);
    });
});

// Informative route for GET request
app.get('/users/cwr-reg', (req, res) => {
    res.status(400).send('This endpoint only supports POST requests.');
});

// Start the server
app.listen(port, () => {
    console.log(`Server running on http://localhost:${port}`);
});
