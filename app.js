const express = require("express");

const app = express();

const PORT = process.env.PORT || 3000;

const appInfo = {
    project: "DevOps Capstone Project",
    application: "Node.js Web Application",
    version: "1.0.0",
    developer: "Naveen Kumar",
    github: "https://github.com/naveenkumar212006/devops-capstone-nodejs",
    docker: "naveenkumar21032006/devops-capstone-nodejs"
};

// Home Page
app.get("/", (req, res) => {
    res.send(`
    <!DOCTYPE html>
    <html>
    <head>
        <title>DevOps Capstone Project</title>
        <style>
            body{
                font-family:Arial,sans-serif;
                background:#f4f4f4;
                text-align:center;
                margin-top:50px;
            }
            .card{
                width:700px;
                margin:auto;
                background:white;
                padding:30px;
                border-radius:10px;
                box-shadow:0 0 15px rgba(0,0,0,.2);
            }
            h1{
                color:#2c3e50;
            }
            table{
                width:100%;
                border-collapse:collapse;
                margin-top:20px;
            }
            td{
                border:1px solid #ddd;
                padding:10px;
                text-align:left;
            }
            tr:nth-child(even){
                background:#f2f2f2;
            }
        </style>
    </head>

    <body>

    <div class="card">

    <h1>🚀 DevOps Capstone Project</h1>

    <h2>CI/CD Pipeline Successfully Deployed</h2>

    <table>

    <tr>
    <td><b>Application</b></td>
    <td>${appInfo.application}</td>
    </tr>

    <tr>
    <td><b>Version</b></td>
    <td>${appInfo.version}</td>
    </tr>

    <tr>
    <td><b>CI/CD</b></td>
    <td>Jenkins Pipeline</td>
    </tr>

    <tr>
    <td><b>Container</b></td>
    <td>Docker</td>
    </tr>

    <tr>
    <td><b>Cloud</b></td>
    <td>AWS EC2</td>
    </tr>

    <tr>
    <td><b>Monitoring</b></td>
    <td>Prometheus + Grafana</td>
    </tr>

    <tr>
    <td><b>Status</b></td>
    <td style="color:green;"><b>Running Successfully ✅</b></td>
    </tr>

    </table>

    <br>

    <a href="/health">Health Check</a>

    </div>

    </body>

    </html>
    `);
});

// Health Endpoint
app.get("/health", (req, res) => {

    res.status(200).json({

        status: "UP",

        application: appInfo.application,

        version: appInfo.version,

        timestamp: new Date(),

        uptime: process.uptime()

    });

});

// API Endpoint
app.get("/api/info", (req, res) => {

    res.json(appInfo);

});

app.listen(PORT, () => {

    console.log(`Application started on port ${PORT}`);

});