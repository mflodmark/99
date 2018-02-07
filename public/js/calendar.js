
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

function GetCalendar(){
    $("#calendar-div").load("calendar/maj.html")
};

getBookedWeeks()

function getBookedWeeks() {
    var props = ["vecka"]
    var kunder = []
    var users = firebase.database().ref("users");
    
    users.on('value', function (snapshot) {
        snapshot.forEach(function (childSnapshot) {
            var childData = childSnapshot.val();
            console.log(childData)
            kunder.push(childData)
        });
        var w = []
        var v = kunder.map((x, i) => {
            for (var j = 0; j < props.length; j++) {
                var sp = x[props[j]].split(" ")
                sp.map(p => {w.push(p)})
            }
        })
        w.splice(w.length-1, 1)

        w.map(p => {
            var tag = p;
            console.log("test"+tag+"test");
            var name = document.getElementById(tag)
            if(name!=null){
            name.style.backgroundColor = "rgb(248, 174, 174)";
            console.log("tag är = "+tag)
            
                        
            }
            
        })
    });
}