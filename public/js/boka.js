
var v = document.getElementById("datum").value = new Date().toLocaleDateString()

$("#book").submit(function () {
    $.post("/form", $("#book").serialize(), function (response) {
        console.log(response);
        alert(response);
    })
})

$(document).ready(function () {
    UsedDates();

    var pickedDates = document.getElementById("picked-dates");
    var price = document.getElementById("price");

    $("#dates").change(function () {
        pickedDates.value += $("#dates").val() + " ";
        var dt = $("#picked-dates").val();
        var res = dt.split(" ");
        res.splice(res.length - 1, 1);
        var prc = 0;

        res.forEach(x => {
            if (Number(x) >= 25 && Number(x) <= 32) { prc += 4500; }
            else if (Number(x) < 25 || Number(x) > 32) { prc += 3500; }
        })

        price.value = prc + " :-";
    })
})

function UsedDates() {
    var props = ["vecka"];
    var kunder = [];
    var weeks = [];
    var users = firebase.database().ref("users");

    $.get("/dates", function (response) {
        console.log(response);
        AddUsedDates(response);
    })
}


function AddUsedDates(weeks) {
    var arr = [];
    for (let index = 20; index <= 40; index++) {
        arr.push(index);
    }

    console.log("arr created");
    console.log(weeks.length + "weeks from kunder");
    console.log(arr.length + "arr");

    var w = []

    // weeks can have multiple values
    weeks.map(p => {
        var v = p.split(" ")
        v.map(x => {
            w.push(x)
        })
    })

    console.log(w.length + "split")

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
