


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

$(document).ready(function () {
    UsedDates();

    var pickedDates = document.getElementById("picked-dates")
    var price = document.getElementById("price")

    $("#dates").change(function () {
        pickedDates.value += $("#dates").val() + " ";
        var dt = $("#picked-dates").val();
        var res = dt.split(" ")
        res.splice(res.length - 1, 1);
        var prc = 0

        res.forEach(x => {
            if (Number(x) >= 25 && Number(x) <= 32) { prc += 4500 }
            else if (Number(x) < 25 || Number(x) > 32) { prc += 3500 }
        })

        price.value = prc + " :-";
    })
})

function UsedDates() {
    var props = ["vecka"]
    var kunder = []
    var weeks = []
    var users = firebase.database().ref("users");


    users.on('value', function (snapshot) {
        snapshot.forEach(function (childSnapshot) {
            var childData = childSnapshot.val();
            kunder.push(childData)
            console.log("kund")
        });

        kunder.map((x, i) => {
            console.log("kundloop")
            for (var j = 0; j < props.length; j++) {
                weeks.push(x[props[j]])
                console.log("kundlooppush")
            }
        })
        AddUsedDates(weeks)       
    });
}


function AddUsedDates(weeks) {
    var arr = []
    for (let index = 20; index <= 40; index++) {
        arr.push(index)
    }

    console.log("arr created")
    console.log(weeks.length + "weeks from kunder")
    console.log(arr.length + "arr")

    // var splitUsedDates = [];
    var w = []

    // weeks can have multiple values
    weeks.map(p => {
        var v = p.split(" ")
        v.map(x => {
            w.push(x)
        })
    })

    console.log(w.length + "split")
    // w.splice(w.length - 1, 1);
    // w.map(p => {
    //     splitUsedDates.push(p)
    // })

    var dates = document.getElementById("dates")
    dates.innerHTML = "<option disabled selected value=''>Välj vecka</option>"

    arr.forEach(x => {
        var check = false;
        for (let index = 0; index < w.length; index++) {
            const element = w[index];
            if (Number(element) == x) {
                check = true
            }
        }

        if (check) {
            console.log(x + "disabled")
            dates.innerHTML += `<option disabled value='' class="text-danger">${x}</option>`
        } else {
            console.log(x + "active")
            dates.innerHTML += `<option value="${x}">${x}</option>`
        }
    })
}
