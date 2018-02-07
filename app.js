const express = require("express");
const db = require("./libs/db");

const app = express()
const port = 8080

app.use(express.static("public"))

// var bodyParser = require("body-parser")
// app.use(bodyParser.urlencoded({ extended: false}))

// app.post("/login", function(req, res) {
//     console.log(req.body)
//     // res.send(req.body)
    
// });

db.init(app);

// The Node.js file system module allow you to work with the file system on your computer.
var fs = require('fs');

// app.get("/maj", function(req, res) {
    
// });



app.listen(port)
console.log("Denna webserver lyssnar på localhost port 8080")
