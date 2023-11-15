let nextRace = 0;
let data = "";
var date, date1, date2, date3, date4, obj;
let offset = new Date().getTimezoneOffset() /-60;

let api_url = "https://ergast.com/api/f1/current/next/races.json";


getData(api_url)

// The data/time we want to countdown to
function setTimer(time, d, h, m, s, e) {

    var countDownDate = new Date(time).getTime();

    // Run myfunc every second
    var myfunc = setInterval(function () {

        var now = new Date().getTime();
        var timeleft = countDownDate - now;

        // Calculating the days, hours, minutes and seconds left
        var days = Math.floor(timeleft / (1000 * 60 * 60 * 24));
        var hours = Math.floor((timeleft % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));
        var minutes = Math.floor((timeleft % (1000 * 60 * 60)) / (1000 * 60));
        var seconds = Math.floor((timeleft % (1000 * 60)) / 1000);

        console.log("countDownDate:", countDownDate);
        console.log("now:", now);
        console.log("timeleft:", timeleft);
        console.log("days:", days);
        console.log("hours:", hours);
        console.log("minutes:", minutes);
        console.log("seconds:", seconds);


        // Result is output to the specific element
        document.getElementById(d).innerHTML = days.toString().padStart(2, "0") + "d "
        document.getElementById(h).innerHTML = hours.toString().padStart(2, "0") + "h "
        document.getElementById(m).innerHTML = minutes.toString().padStart(2, "0") + "m "
        document.getElementById(s).innerHTML = seconds.toString().padStart(2, "0") + "s "

        // Display the message when countdown is over
        if (timeleft < 0) {
            clearInterval(myfunc);
            document.getElementById(d).innerHTML = ""
            document.getElementById(h).innerHTML = ""
            document.getElementById(m).innerHTML = ""
            document.getElementById(s).innerHTML = ""
            document.getElementById(e).innerHTML = "TIME UP!!";

        }
    }, 1000);
}

function clearTimer() {
    document.getElementById("e1").innerHTML = "";
    document.getElementById("e2").innerHTML = "";
    document.getElementById("e3").innerHTML = "";
    document.getElementById("e4").innerHTML = "";
    document.getElementById("end").innerHTML = "";
}

function getTime(dte,t) {
    let y = dte.split("-")[0];
    let m= dte.split("-")[1];
    let d= dte.split("-")[2];
    let time1 = t.replace('Z', ' ');
    let timegmt = Number(time1.split(":")[0]);
    timegmt += offset;
    let time = timegmt + ":" + time1.split(":")[1] + ":" + time1.split(":")[2];
    return m + " " + d + ", " + y + " " + time;
}

function getDay(dte,t) {
    let y = dte.split("-")[0];
    let m= dte.split("-")[1];
    let d= dte.split("-")[2];
    let time1 = t.replace('Z', ' ');
    let timegmt = Number(time1.split(":")[0]);
    timegmt += offset;
    let time = timegmt + ":" + time1.split(":")[1];
    return d + "/ " + m + "/ " + y + " " + time;
}

var requestOptions = {
    method: 'GET',
    redirect: 'follow'
};

async function getData(file) {
    let result = await fetch(file, requestOptions);
    let dt = await result.json();
    data = dt.MRData;
    var x = data.RaceTable.Races[nextRace].date;
    var y = data.RaceTable.Races[nextRace].time;
    document.getElementById("race").innerHTML = data.RaceTable.Races[nextRace].raceName;

    day = getDay(x,y);

    date = getTime(x,y);
    setTimer(date, "days", "hours", "mins", "secs", "end");

    obj = data.RaceTable.Races[nextRace];
    obj = Object.values(obj);

    day1 = getDay(obj[7].date,obj[7].time);
    date1 = getTime(obj[7].date,obj[7].time);
    setTimer(date1, "d1", "h1", "m1", "s1", "e1");

    day2 = getDay(obj[8].date,obj[8].time);
    date2 = getTime(obj[8].date,obj[8].time);
    setTimer(date2, "d2", "h2", "m2", "s2", "e2");

    day3 = getDay(obj[9].date,obj[9].time);
    date3 = getTime(obj[9].date,obj[9].time);
    setTimer(date3, "d3", "h3", "m3", "s3", "e3");

    day4 = getDay(obj[10].date,obj[10].time);
    date4 = getTime(obj[10].date,obj[10].time);
    setTimer(date4, "d4", "h4", "m4", "s4", "e4");

    var sprint = data.RaceTable.Races[nextRace].Sprint;
    if (sprint) {
        document.getElementById("timing1").innerHTML = "1st Practice: " + day1;
        document.getElementById("timing2").innerHTML = "Qualification: " + day2;
        document.getElementById("timing3").innerHTML = "2nd Practice: " + day3;
        document.getElementById("timing4").innerHTML = "Sprint : " + day4;
    } else {
        document.getElementById("timing1").innerHTML = "1st Practice: " + day1;
        document.getElementById("timing2").innerHTML = "2nd Practice: " + day2;
        document.getElementById("timing3").innerHTML = "3rd Practice: " + day3;
        document.getElementById("timing4").innerHTML = "Qualification: " + day4;
    }
}

var endElement = document.getElementById("end");
if (endElement && endElement.innerHTML === "TIME UP!!") {
    clearTimer();
}

