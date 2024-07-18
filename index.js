const time = document.querySelector('#time');
const iniciar = document.querySelector('#start');
const parar = document.querySelector('#stop');
const reiniciar = document.querySelector('#reset');
const table = document.querySelector('#table');
/*
function updateTime() {
  const date = new Date();
  const hours = date.getHours();
  const minutes = date.getMinutes();
  const seconds = date.getSeconds();

  time.innerHTML = `${hours}:${minutes}:${seconds}`;
}
*/

let current = '';

const getTimes = () => {
  table.innerHTML = '';
  const times = JSON.parse(localStorage.getItem('time'));
  if (times) {
    times.forEach((time) => {
      const row = document.createElement('tr');
      const td = document.createElement('td');
      td.innerHTML = time.time;
      row.appendChild(td);
      table.appendChild(row);
    });
  }
}

const saveTime = () => {
  let times = JSON.parse(localStorage.getItem('time')) || [];
  times = [{
    id: Date.now(),
    time: current,
  }, ...times];
  localStorage.setItem('time', JSON.stringify(times));
  getTimes();
}

iniciar.addEventListener('click', () => {
  if (!cron) {
    cronometro();
  }
});

parar.addEventListener('click', () => {
  stop();
});

reiniciar.addEventListener('click', () => {
  stop();
  time.innerHTML = '00:00:00';
});

var cron = null;

function cronometro() {
  let seconds = 0;
  let minutes = 0;
  let hours = 0;

  cron = setInterval(() => {
    seconds++;
    if (seconds === 60) {
      minutes++;
      seconds = 0;
    }
    if (minutes === 60) {
      hours++;
      minutes = 0;
    }

    if (seconds < 10) {
      let temp = parseInt(seconds, 10);
      seconds = `0${temp}`;
    }
    if (minutes < 10) {
      let temp = parseInt(minutes, 10);
      minutes = `0${temp}`;
    }
    if (hours < 10) {
      let temp = parseInt(hours, 10);
      hours = `0${temp}`;
    }

    current = `${hours}:${minutes}:${seconds}`;
    time.innerHTML = current;
  }, 1000);
}

function init() {
  // updateTime();
  cronometro();
}

function stop() {
  if (cron) {
    clearInterval(cron);
    saveTime();
    current = '';
    time.innerHTML = '00:00:00';
    cron = null; 
  }
}

getTimes();
