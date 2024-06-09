let nextRace = 0;
let data = "";
var date, date1, date2, date3, date4, obj;
let offset = new Date().getTimezoneOffset() / -60;

let original_api = "https://ergast.com/api/f1/current/next/races.json";
let my_api = "https://rodrigograc4.github.io/ApexHub-F1/API/nextrace.json"; // Nome do arquivo JSON

getData(original_api);

// The data/time we want to countdown to
function setTimer(time, d, h, m, s, e) {
    // Verifique e ajuste o formato da data
    var parsedDate = new Date(time);
    if (isNaN(parsedDate.getTime())) {
        // Se a data não puder ser analisada corretamente, imprima um log e saia da função
        console.error("Formato de data inválido:", time);
        return;
    }

    // Adicione um dia à data de contagem regressiva
    var countDownDate = parsedDate.getTime();

    var myfunc = setInterval(function () {
        var now = new Date().getTime();
        var timeleft = countDownDate - now;

        // Calculating the days, hours, minutes and seconds left
        var days = Math.floor(timeleft / (1000 * 60 * 60 * 24));
        var hours = Math.floor((timeleft % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));
        var minutes = Math.floor((timeleft % (1000 * 60 * 60)) / (1000 * 60));
        var seconds = Math.floor((timeleft % (1000 * 60)) / 1000);

        // Result is output to the specific element
        document.getElementById(d).innerHTML = (days !== 0) ? days.toString().padStart(2, "0") + "d " : "";
        document.getElementById(h).innerHTML = (days !== 0 || hours !== 0) ? hours.toString().padStart(2, "0") + "h " : "";
        document.getElementById(m).innerHTML = (days !== 0 || hours !== 0 || minutes !== 0) ? minutes.toString().padStart(2, "0") + "m " : "";
        document.getElementById(s).innerHTML = seconds.toString().padStart(2, "0") + "s ";

        // Send push notification when days are 3, 2, or 1
        if (days === 3 & hours === 0 && minutes === 0 && seconds === 0) {
            sendNotification("Its race weekend", "The countdown to the race has started!");
        } else if (days === 2 && hours === 0 && minutes === 0 && seconds === 0) {
            sendNotification("Less than 2 days left", "Don't forget it!");
        } else if (days === 1 && hours === 0 && minutes === 0 && seconds === 0) {
            sendNotification("24 hours until the race", "Are you ready?");
        } else if (days === 0 && hours === 1 && minutes === 0 && seconds === 0) {
            sendNotification("Race almost starting", "Lights out in 1 hour!");
        }

        // Display the message when countdown is over
        if (timeleft < 0) {
            clearInterval(myfunc);
            document.getElementById(d).innerHTML = "";
            document.getElementById(h).innerHTML = "";
            document.getElementById(m).innerHTML = "";
            document.getElementById(s).innerHTML = "";
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

function getTime(dte, t) {
    let y = dte.split("-")[0];
    let m = dte.split("-")[1];
    let d = dte.split("-")[2];
    let time1 = t.replace('Z', ' ');
    let timegmt = Number(time1.split(":")[0]);
    timegmt += offset;
    let time = timegmt + ":" + time1.split(":")[1] + ":" + time1.split(":")[2];
    let hours = time.split(":")[0];
    let minutes = time.split(":")[1];
    let seconds = time.split(":")[2];
    let date = new Date(y, m - 1, d, hours, minutes, seconds); // Set the time of the Date object
   //date.setDate(date.getDate() + 1);    // ADICIONAR UM DIA PORQUE A API ESTA ERRADA
   return date.toLocaleString("en-US", { month: "short", day: "2-digit", year: "numeric", hour: "2-digit", minute: "2-digit", second: "2-digit"}); // Format the date string in the "MM DD, YYYY HH:MM:SS" format
}

function getDay(dte, t) {
    let y = dte.split("-")[0];
    let m = dte.split("-")[1];
    let d = dte.split("-")[2];
    let time1 = t.replace('Z', ' ');
    let timegmt = Number(time1.split(":")[0]);
    timegmt += offset;
    let time = timegmt + ":" + time1.split(":")[1];
    let hours = time.split(":")[0];
    let minutes = time.split(":")[1];
    let date = new Date(y, m - 1, d, hours, minutes); // Set the time of the Date object
    //date.setDate(date.getDate() + 1);   // ADICIONAR UM DIA PORQUE A API ESTA ERRADA
    return date.toLocaleString("en-US", { month: "short", day: "2-digit", year: "numeric"}) + "  at  " + time; // Format the date string in the "MM DD, YYYY HH:MM:SS" format
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

    day = getDay(x, y);

    date = getTime(x, y);
    setTimer(date, "days", "hours", "mins", "secs", "end");

    obj = data.RaceTable.Races[nextRace];
    obj = Object.values(obj);

    day1 = getDay(obj[7].date, obj[7].time);
    date1 = getTime(obj[7].date, obj[7].time);
    setTimer(date1, "d1", "h1", "m1", "s1", "e1");

    day2 = getDay(obj[8].date, obj[8].time);
    date2 = getTime(obj[8].date, obj[8].time);
    setTimer(date2, "d2", "h2", "m2", "s2", "e2");

    day3 = getDay(obj[9].date, obj[9].time);
    date3 = getTime(obj[9].date, obj[9].time);
    setTimer(date3, "d3", "h3", "m3", "s3", "e3");

    day4 = getDay(obj[10].date, obj[10].time);
    date4 = getTime(obj[10].date, obj[10].time);
    setTimer(date4, "d4", "h4", "m4", "s4", "e4");

    var sprint = data.RaceTable.Races[nextRace].Sprint;
    if (sprint) {
        document.getElementById("timing1").innerHTML = "1st Practice: " + day1 + "h";
        document.getElementById("timing2").innerHTML = "Qualifying: " + day2 + "h";
        document.getElementById("timing3").innerHTML = "2nd Practice: " + day3 + "h";
        document.getElementById("timing4").innerHTML = "Sprint : " + day4 + "h";
        document.getElementById("timing5").innerHTML = day + "h";
    } else {
        document.getElementById("timing1").innerHTML = "1st Practice: " + day1 + "h";
        document.getElementById("timing2").innerHTML = "2nd Practice: " + day2 + "h";
        document.getElementById("timing3").innerHTML = "3rd Practice: " + day3 + "h";
        document.getElementById("timing4").innerHTML = "Qualifying: " + day4 + "h";
        document.getElementById("timing5").innerHTML = day + "h";
    }
}

var endElement = document.getElementById("end");
if (endElement && endElement.innerHTML === "TIME UP!!") {
    clearTimer();
}







// NOTIFICATION


// Importando Firebase
import { initializeApp } from "https://www.gstatic.com/firebasejs/10.12.2/firebase-app.js";
import { getMessaging, getToken, onMessage } from "https://www.gstatic.com/firebasejs/10.12.2/firebase-messaging.js";

// Configuração do Firebase
const firebaseConfig = {
    apiKey: "AIzaSyDJqIRd11jCSzx64_8dpWPVpIdNFzl07RE",
    authDomain: "apexhub-f1.firebaseapp.com",
    projectId: "apexhub-f1",
    storageBucket: "apexhub-f1.appspot.com",
    messagingSenderId: "931355642260",
    appId: "1:931355642260:web:a439e04c49bf8d5d1fa781",
    measurementId: "G-0KWSCPC724"
};

// Inicializando o Firebase
const app = initializeApp(firebaseConfig);
const messaging = getMessaging(app);

// Solicitando permissão
async function requestPermission() {
  const permission = await Notification.requestPermission();
  if (permission === 'granted') {
    console.log('Permissão de notificação concedida.');
    // Corrigindo a chamada ao getToken
    const token = await getToken(messaging, { vapidKey: "BPvCrGZMQ0lw0DjkCAIvYpmmo9Mwwv69hizLIoh6aliJ5VkICoF8HDdo_I9sTtNwXiyxS0x9hbfdJAQs52utEDU" });
    console.log('Token:', token);
  } else {
    console.log('Não foi possível obter permissão para enviar notificações.');
  }
}

requestPermission();

// Lidando com mensagens recebidas quando o aplicativo está em primeiro plano
onMessage(messaging, (payload) => {
  console.log('Mensagem recebida.', payload);
  // Personalizando a notificação aqui
  const notificationTitle = payload.notification.title;
  const notificationOptions = {
    body: payload.notification.body,
    icon: 'Images/ApexIcon_v2-01.png'
  };

  // Exibindo a notificação
  new Notification(notificationTitle, notificationOptions);
});

