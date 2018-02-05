getBookedDates()

// getNotBookedDates()

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


// function getNotBookedDates() {
//     var props = ["vecka"]
//     var kunder = []
//     var users = firebase.database().ref("users");
//     var startWeek = 20
//     var endWeek = 40

//     users.on('value', function (snapshot) {
//         snapshot.forEach(function (childSnapshot) {
//             var childData = childSnapshot.val();
//             kunder.push(childData)
//         });
//     });

//     for (let index = startWeek; index <= endWeek; index++) {
        
//         for (let val = 0; val < kunder.length; val++) {
//             const element = array[val];
            
//             console.log(element["vecka"])

//             if(index == element["vecka"]) {
//                 document.getElementById("t2").innerHTML += "<tr><td>" + index + "</td></tr>";                    
//             }
//         }
//     }

// }