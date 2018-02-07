getBookedDates()

function getBookedDates() {
    var props = ["vecka"]
    var kunder = []
    var users = firebase.database().ref("users");
    
    users.on('value', function (snapshot) {
        snapshot.forEach(function (childSnapshot) {
            var childData = childSnapshot.val();
            console.log(childData)
            kunder.push(childData)
            
        });
        
        kunder.reverse();
        var v = kunder.map((x, i) => {
            var rad = "<tr>"
            for (var j = 0; j < props.length; j++) {
                rad += "<td>" + x[props[j]] + "</td>"
            }
            rad += "</tr>"
            document.getElementById("t1").innerHTML += rad
        })
    });


}


