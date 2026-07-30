const express = require("express");

const app = express();

const PORT = process.env.PORT || 3000;

app.get("/", (req, res) => {
    res.send(`
        <h1>🚀 DevOps Capstone Project</h1>
        <h2>Node.js Application</h2>
        <p>Successfully deployed using Jenkins, Docker, and AWS EC2.</p>
        <hr>
        <p>CI/CD Pipeline Status: ✅ Running</p>
    `);
});

app.get("/health", (req, res) => {
    res.status(200).json({
        status: "UP",
        application: "Node.js DevOps Capstone",
        timestamp: new Date()
    });
});

app.listen(PORT, () => {
    console.log(`Server running on port ${PORT}`);
});