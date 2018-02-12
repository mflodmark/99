var email = document.getElementById("email")
var pwd = document.getElementById("password")
var btn = document.getElementById("btn")
var loginDiv = document.getElementById("login-div")
var logoutDiv = document.getElementById("logout-div")

$("#login-div").hide();
$("#logout-div").hide();
CheckUserState();

$("#login-div").submit(function() {
    console.log("test log in")
    var obj = {email: email.value, password: pwd.value}
    $.post("/login", obj, function(response) {
        if(response) {
            console.log("Det gick att logga in");
            CheckUserState(response);
        }
    })
})

$("#logout-btn").click(function () {
    $.get("/logout", function(response) {
        if(response) {
            console.log("Det gick att logga ut");
            CheckUserState(false);
        }
    })
})

function CheckUserState(allBookings) {
    // Check user login
    if (allBookings) {
        // User is signed in.
        console.log("Inloggad");
        $("#logout-div").show();
        $("#login-div").hide();
		
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
        $("#login-div").show();
        $("#logout-div").hide();
        pwd.value = '';
    }
}