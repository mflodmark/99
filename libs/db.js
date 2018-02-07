const firebase = require("firebase");

// Initialize Firebase
// TODO: Replace with your project's customized code snippet
var config = {
    apiKey: "AIzaSyB09PIvmKXDODbwm4uThwDp9sYiezNLFcI",
    authDomain: "sundre-37509.firebaseapp.com",
    databaseURL: "https://sundre-37509.firebaseio.com",
    storageBucket: "sundre-37509.appspot.com",
};
firebase.initializeApp(config);

var fb = firebase.database();

exports.createBooking = function(data, res) {
    fb.ref('users').push(data)
    res.send("Tack för din bokning.\nVi återkommer inom ngn dag med bekräftelse\n\nHälsningar Kurt")
}

exports.getBookedDates = function(res) {
    var props = ["vecka"]
    var kunder = []
    var weeks = []
    var users = firebase.database().ref("users");

    users.on('value', function (snapshot) {
        snapshot.forEach(function (childSnapshot) {
            var childData = childSnapshot.val();
            kunder.push(childData)
            console.log("kund")
        });

        kunder.map((x, i) => {
            console.log("kundloop")
            for (var j = 0; j < props.length; j++) {
                weeks.push(x[props[j]])
                console.log("kundlooppush")
            }
        })
        res.send(weeks)
    });

}

/** @param {Express} app */
exports.init = function init(app) {
    app.get("/someapi", function(req, res) {
        res.send({
            foo: "bar",
            moo: 1023
        });
    });
}