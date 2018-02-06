const express = require("express");
const db = require("./libs/db");

const app = express()
const port = 8080

app.use(express.static("public"))

// GET Route 
app.get("/admin41", function(req, res) {
    console.log(req.query.user + req.query.pwd)
    res.send(req.query.admin)
});

db.init(app);

// The Node.js file system module allow you to work with the file system on your computer.
var fs = require('fs');

app.listen(port)
console.log("Denna webserver lyssnar på localhost port 8080")
