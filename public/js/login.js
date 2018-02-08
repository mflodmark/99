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
            console.log("Det gick att logga in")
            CheckUserState(true)
        }
    })
})

$("#logout-btn").click(function () {
    $.get("/logout", function(response) {
        if(response) {
            console.log("Det gick att logga ut")
            CheckUserState(false)
        }
    })
})

function CheckUserState(user) {
    console.log("userstate")    
    // Check user login
    // var user = firebase.auth().currentUser;
    if (user) {
        // User is signed in.
        console.log("Inloggad")
        $("#logout-div").show();
        $("#login-div").hide();

        var props = ["vecka", "belopp", "förnamn", "efternamn", "pnr", "adress", "postnr", "ort", "telefon", "mail", "datum"]
        document.getElementById("admin-data").innerHTML = ""
    
        $.get("/allBookings", function (response) {
            var v = response.map((x, i) => {
                var rad = "<tr>"
                for (var j = 0; j < props.length; j++) {
                    rad += "<td>" + x[props[j]] + "</td>"
                }
                rad += "</tr>"
                document.getElementById("admin-data").innerHTML += rad
            })
        })
    } else {
        // No user is signed in.
        console.log("Ej inloggad")
        $("#login-div").show();
        $("#logout-div").hide();
        pwd.value = '';
    }
}