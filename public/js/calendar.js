
$("#maj").click(function () {
    $("#calendar-div").load("calendar/maj.html", getBookedWeeks)
})

$("#juni").click(function () {
    $("#calendar-div").load("calendar/juni.html", getBookedWeeks)
})

$("#juli").click(function () {
    $("#calendar-div").load("calendar/juli.html", getBookedWeeks)
})

$("#augusti").click(function () {
    $("#calendar-div").load("calendar/augusti.html", getBookedWeeks)
})

function GetCalendar() {
    $("#calendar-div").load("calendar/maj.html", getBookedWeeks)

};

getBookedWeeks()

function getBookedWeeks() {
    var props = ["vecka"]
    var kunder = []

    $.get("/dates", function (response) {
        response.splice(response.length - 1, 1)
        response.map(p => {
            var tag = p;
            
            var name = document.getElementById(tag)
            if (name != null) {
                name.style.backgroundColor = "rgb(248, 174, 174)";
                
            }
        })
    })
}