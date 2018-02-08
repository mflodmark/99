$("#btn").click(function () {
    var props = ["vecka", "belopp", "förnamn", "efternamn", "pnr", "adress", "postnr", "ort", "telefon", "mail", "datum"];
    document.getElementById("admin-data").innerHTML = "";

    $.get("/allBookings", function (response) {
        var v = response.map((x, i) => {
            var rad = "<tr>";
            for (var j = 0; j < props.length; j++) {
                rad += "<td>" + x[props[j]] + "</td>";
            }
            rad += "</tr>";
            document.getElementById("admin-data").innerHTML += rad;
        });
    });
});