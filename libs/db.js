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

async function logout(res) {
	await firebase.auth().signOut()
	res.send(true);
}

async function login(data) {	
	const auth = firebase.auth();
	try {
		const promise = await auth.signInWithEmailAndPassword(data.email, data.password);
		return !!promise;
	} catch (e) {
		return false;
	}
}

/** @param {} data, @param {Response} res */
function createBooking(data, res) {
	data.datum = dateutil.niceDate();

	fb.ref('users').push(data);
	res.send("Tack för din bokning.\nVi återkommer inom ngn dag med bekräftelse\n\nHälsningar Kurt");
};

/** @returns {Promise<string[]>} */
async function getBookedWeeks(res) {
	var kunder = [];
	var weeks = [];
	var users = firebase.database().ref("users");

	var snapshot = await users.once('value');

	snapshot.forEach(function (childSnapshot) {
		var kund = childSnapshot.val();
		var veckor = kund["vecka"].split(" ").filter(o => o);
		weeks = weeks.concat(veckor);
	});

	return weeks;
}

/** @param {Response} res */
async function sendBookedWeeks(res) {
	res.send(await getBookedWeeks());
};

/** @returns {Promise<{}[]>} */
async function getAllBookings() {
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
async function sendAllBookings(res) {
	res.send(await getAllBookings());
};

/** @param {Express} app */
exports.init = function (app) {
	app.post("/form", async function(req, res) {
		await createBooking(req.body, res);
	})

	app.get("/dates", async function(req, res) {
		await sendBookedWeeks(res);
	})

	app.get("/logout", async function(req, res) {
		await logout(res);
	})

	app.post("/login", async function(req, res) {
		if (await login(req.body))
			await sendAllBookings(res);
		else
			res.send(false);
	})
}