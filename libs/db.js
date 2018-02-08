const firebase = require("firebase");
const dateutil = require("./dateutil");

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
	data.datum = dateutil.niceDate();

	fb.ref('users').push(data);
	res.send("Tack för din bokning.\nVi återkommer inom ngn dag med bekräftelse\n\nHälsningar Kurt");
};

/** @returns {Promise<string[]>} */
exports.getBookedWeeks = async function () {
	var kunder = [];
	var weeks = [];
	var users = firebase.database().ref("users");

	var snapshot = await users.once('value');

	snapshot.forEach(function (childSnapshot) {
		var kund = childSnapshot.val();
		var veckor = kund["vecka"].split(" ");
		weeks.concat(veckor);
	});

	return weeks;
}

/** @param {Response} res */
exports.sendBookedWeeks = async function (res) {
	res.send(await exports.getBookedWeeks());
};

/** @returns {Promise<{}[]>} */
exports.getAllBookings = async function () {
	var kunder = [];
	var users = firebase.database().ref("users");

	var snapshot = await users.once('value');

	snapshot.forEach(function (childSnapshot) {
		var childData = childSnapshot.val();
		kunder.push(childData);
	});

	return kunder;
}

/** @param {Response} res */
exports.sendAllBookings = async function (res) {
	res.send(await exports.getAllBookings());
};

/** @param {Express} app */
exports.init = function init(app) {
	app.get("/someapi", function (req, res) {
		res.send({
			foo: "bar",
			moo: 1023
		});
	});
}