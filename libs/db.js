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

exports.createBooking = function (data, res) {
    fb.ref('users').push(data)
    res.send("Tack för din bokning.\nVi återkommer inom ngn dag med bekräftelse\n\nHälsningar Kurt")
}

// exports.login = function (data, res) {
//     const auth = firebase.auth();

//     const promise = auth.signInWithEmailAndPassword(email.value, pwd.value)

//     promise.catch(function (error) {
//         // Handle Errors here.
//         var errorCode = error.code;
//         var errorMessage = error.message;
//         // ...
//     });
// }

exports.getBookedDates = function (res) {
    var props = ["vecka"]
    var kunder = []
    var weeks = []
    var users = firebase.database().ref("users");

    users.on('value', function (snapshot) {
        snapshot.forEach(function (childSnapshot) {
            var childData = childSnapshot.val();
            kunder.push(childData)
        });

        kunder.map((x, i) => {
            for (var j = 0; j < props.length; j++) {
                // var trim = x[props[j]].trim()
                var sp = x[props[j]].split(" ")
                sp.map(p => { weeks.push(p) })
            }
        })
        res.send(weeks)
    });
}

exports.GetAllBookings = function (res) {
    var kunder = []
    var users = firebase.database().ref("users");

    users.on('value', function (snapshot) {
        snapshot.forEach(function (childSnapshot) {
            var childData = childSnapshot.val();
            console.log(childData)
            kunder.push(childData)
        });

        res.send(kunder)
    });
}

// exports.checkUserState = function (req, res) {
//     var user = admin.auth().verifyIdToken(idToken)
//     res.send(user)
//     // var user = firebase.auth().currentUser;
//     // console.log("node check user")
//     // res.send(user)
// }

/** @param {Express} app */
exports.init = function init(app) {
    app.get("/someapi", function (req, res) {
        res.send({
            foo: "bar",
            moo: 1023
        });
    });
}