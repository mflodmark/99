var email = document.getElementById("email");
var pwd = document.getElementById("password");
var btn = document.getElementById("btn");
var loginDiv = document.getElementById("login-div");
var logoutDiv = document.getElementById("logout-div");

$("#login-div").hide();
$("#logout-div").hide();
CheckUserState();

$("#btn").click(ButtonClick);

$("#logout-btn").click(function () {
    firebase.auth().signOut()
        .then(CheckUserState);
});

function ButtonClick() {
    const auth = firebase.auth();

    const promise = auth.signInWithEmailAndPassword(email.value, pwd.value)
        .then(CheckUserState);

    promise.catch(function (error) {
        // Handle Errors here.
        var errorCode = error.code;
        var errorMessage = error.message;
        // ...
    });
}

function CheckUserState() {
    console.log("userstate")    
    // Check user login
    var user = firebase.auth().currentUser;
    if (user) {
        // User is signed in.
        console.log("Inloggad");
        $("#logout-div").show();
        $("#login-div").hide();

    } else {
        // No user is signed in.
        console.log("Ej inloggad");
        $("#login-div").show();
        $("#logout-div").hide();
        pwd.value = '';
    }
}