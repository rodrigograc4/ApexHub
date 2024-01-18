const IDLE = "idle";
const RUNNING = "running";
const WAITING = "waiting";
const LIGHT_ON_INTERVAL = 1000;

let state = IDLE;
let nextLightStrip = 0;
let result = "00.000";
let startTime = null;
let timerId = null;
let fuzzerId = null;
let best = localStorage.best || 0;

function start() {
  nextLightStrip = 0;
  result = "00.000";
  startTime = null;
  clearLights();

  turnOnNextLight();
  timerId = setInterval(() => turnOnNextLight(), LIGHT_ON_INTERVAL);
}

function turnOnNextLight() {
  if (nextLightStrip == 5) {
    fuzzedLightsOut();
    clearInterval(timerId);
  } else {
    switchOnLight(nextLightStrip, true);
    nextLightStrip++;
  }
}

function fuzzedLightsOut() {
  const fuzzyInterval = Math.random() * 1800 + 2400;
  fuzzerId = setTimeout(() => {
    clearLights();
    startTime = Date.now();
    state = WAITING;
  }, fuzzyInterval);
}

function clearLights() {
  for (let i = 0; i < 5; i++) {
    switchOnLight(i, false);
  }
}

function onClick() {
  if (state == RUNNING) {
    state = IDLE;
    result = "JUMP START!";
    clearInterval(timerId);
    clearTimeout(fuzzerId);
  } else if (state == IDLE) {
    state = RUNNING;
    start();
  } else if (state == WAITING) {
    state = IDLE;
    const timeDiff = Date.now() - startTime;
    result = format(timeDiff);
    best = best === 0 ? timeDiff : Math.min(best, timeDiff);
    localStorage.best = best;
    document.getElementById("best").innerText = format(best);
  }

  document.getElementById("result").innerText = result;
}

function format(ms) {
  const secs = (ms / 1000).toFixed(3);
  return `${(parseInt(secs) < 10 ? "0" : "") + secs}`;
}

function switchOnLight(index, on) {
  const lightElement = document.getElementById(`light${index}`);
  lightElement.innerHTML = ""; // Clear previous content
  for (let i = 0; i < 2; i++) {
    const lightDiv = document.createElement("div");
    lightDiv.className = "light";
    lightDiv.classList.add("off");
    lightElement.appendChild(lightDiv);
  }
  for (let i = 0; i < 2; i++) {
    const lightDiv = document.createElement("div");
    lightDiv.className = "light";
    lightDiv.classList.add(on ? "on" : "off");
    lightElement.appendChild(lightDiv);
  }
}

window.onload = function () {
    document.getElementById("best").innerText = format(localStorage.getItem('best') || 0);
    document.getElementById("result").innerText = "00.000";
};