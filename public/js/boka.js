
// Initialize Firebase
var config = {
    apiKey: "AIzaSyB09PIvmKXDODbwm4uThwDp9sYiezNLFcI",
    authDomain: "sundre-37509.firebaseapp.com",
    databaseURL: "https://sundre-37509.firebaseio.com",
    projectId: "sundre-37509",
    storageBucket: "sundre-37509.appspot.com",
    messagingSenderId: "781649557120"
};

firebase.initializeApp(config);

var v = document.getElementById("datum").value = new Date().toLocaleDateString()
    
function send() {
    var props = ["vecka", "belopp", "förnamn", "efternamn", "pnr", "adress", "postnr", "ort", "telefon", "mail", "datum"]
    var inputs = Array.from(document.forms["boka"].getElementsByTagName("input"));
    var obj = {}
    
    inputs = inputs.map((x, i) => {
        obj[props[i]] = x.value
    })

    console.log(obj)
    var v = firebase.database();
    v.ref('users').push(obj)
    document.getElementById("submit").style.visibility = 'hidden'
    alert("Tack för din bokning.\n Vi återkommer inom ngn dag med bekräftelse\nHälsningar Kurt")
    return false 
}
