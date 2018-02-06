$("#btn").click(function () {
    var props = ["vecka", "belopp", "förnamn", "efternamn", "pnr", "adress", "postnr", "ort", "telefon", "mail", "datum"]
    var kunder = []
    var users = firebase.database().ref("users");
    document.getElementById("admin-data").innerHTML = ""

    users.on('value', function (snapshot) {

        snapshot.forEach(function (childSnapshot) {
            var childData = childSnapshot.val();
            console.log(childData)
            kunder.push(childData)
        });
        var v = kunder.map((x, i) => {
            var rad = "<tr>"
            for (var j = 0; j < props.length; j++) {
                rad += "<td>" + x[props[j]] + "</td>"
            }
            rad += "</tr>"
            document.getElementById("admin-data").innerHTML += rad
        })
    });
});