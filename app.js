const express = require("express")
const app = express()
const port = 8080

app.use(express.static("public"))

// GET Route 
app.get("/t", function(req, res) {
    res.send("Testing")
});

// The Node.js file system module allow you to work with the file system on your computer.
var fs = require('fs');

app.listen(port)
console.log("Denna webserver lyssnar på localhost port 8080")
