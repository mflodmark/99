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

/** @param {Express} app */
exports.init = function init(app) {
    app.get("/someapi", function(req, res) {
        res.send({
            foo: "bar",
            moo: 1023
        });
    });
}