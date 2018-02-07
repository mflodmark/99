
$("#maj").click(function () {
    $("#calendar-div").load("calendar/maj.html")
})

$("#juni").click(function () {
    $("#calendar-div").load("calendar/juni.html")
})

$("#juli").click(function () {
    $("#calendar-div").load("calendar/juli.html")
})

$("#augusti").click(function () {
    $("#calendar-div").load("calendar/augusti.html")
})

function GetCalendar() {
    $("#calendar-div").load("calendar/maj.html")
};

getBookedWeeks()

function getBookedWeeks() {
    var props = ["vecka"]
    var kunder = []
    var users = firebase.database().ref("users");

    $.get("/dates", function (response) {
        console.log(response)

        response.splice(response.length - 1, 1)

        response.map(p => {
            var tag = p;
            console.log("test" + tag + "test");
            var name = document.getElementById(tag)
            if (name != null) {
                name.style.backgroundColor = "rgb(248, 174, 174)";
                console.log("tag är = " + tag)
            }
        })
    })
}