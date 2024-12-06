const express = require('express');
const path = require('path');
const fs = require('fs');
const XLSX = require('xlsx');

const app = express();
app.use(express.json());

// Serve static files from the public directory
app.use(express.static('public'));

// Route for the root URL
app.get('/', (req, res) => {
    res.sendFile(path.join(__dirname, 'public', 'index.html'));
});

app.post('/rename', (req, res) => {
    const { files, renamePattern } = req.body;
    files.forEach(file => {
        const oldPath = path.join(__dirname, 'uploads', file.oldName);
        const newPath = path.join(__dirname, 'uploads', file.newName);
        fs.rename(oldPath, newPath, err => {
            if (err) throw err;
        });
    });
    res.send('Files renamed successfully');
});

app.listen(3000, () => {
    console.log('Server running on port 3000');
});

