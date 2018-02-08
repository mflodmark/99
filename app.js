const express = require("express");
const db = require("./libs/db");

const app = express();
const port = 8080;

app.use(express.static("public"));

var bodyParser = require("body-parser");
app.use(bodyParser.urlencoded({ extended: false}));

app.post("/form", async function(req, res) {
    await db.createBooking(req.body, res);
})

app.get("/dates", async function(req, res) {
    await db.sendBookedWeeks(res);
})

app.get("/allBookings", async function(req, res) {
    await db.sendAllBookings(res);
})

db.init(app);

// The Node.js file system module allow you to work with the file system on your computer.
var fs = require('fs');

app.listen(port)
console.log("Denna webserver lyssnar på localhost port 8080")
