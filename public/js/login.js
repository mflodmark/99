
var email = $("#email");
var pwd = $("#password");
var logoutBtn = $("#logout-btn");
var loginDiv = $("#login-div");
var logoutDiv = $("#logout-div");

loginDiv.show();
logoutDiv.hide();

loginDiv.submit(function () {
	var data = { email: email.val(), password: pwd.val() }
	$.post("/login", data, function (response) {
		CheckUserState(response);
	});
});

logoutBtn.on('click', function () {
	CheckUserState(void(0));
	$.get("/logout", function (response) {
		//
	});
});

function CheckUserState(allBookings) {
	console.log(allBookings);
	// Check user login
	if (allBookings) {
		// User is signed in.
		console.log("Inloggad");
		logoutDiv.show();
		loginDiv.hide();

		var props = ["vecka", "belopp", "förnamn", "efternamn", "pnr", "adress", "postnr", "ort", "telefon", "mail", "datum"];

		var html = allBookings.map(booking =>
			`<tr>
				${props.map(name => `<td>${booking[name]}</td>`).join('\n')}
			</tr>`
		).join('\n');

		$("#admin-data").html(html);
	} else {
		// No user is signed in.
		console.log("Ej inloggad")
		loginDiv.show();
		logoutDiv.hide();
		pwd.val('');
		if (allBookings === false)
			$("#login-div .alert").hide().fadeIn();
	}
}
