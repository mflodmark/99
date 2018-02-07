const express = require("express");
const db = require("./libs/db");

const app = express()
const port = 8080

app.use(express.static("public"))

var bodyParser = require("body-parser")
app.use(bodyParser.urlencoded({ extended: false}))

app.post("/form", function(req, res) {
    db.createBooking(req.body, res)
    return false
})

app.get("/dates", function(req, res) {
    db.getBookedDates(res)
    return false
})

db.init(app);

// The Node.js file system module allow you to work with the file system on your computer.
var fs = require('fs');

app.listen(port)
console.log("Denna webserver lyssnar på localhost port 8080")
