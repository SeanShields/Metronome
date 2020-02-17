const START_BTN = 'start';
const STOP_BTN = 'stop';
const AUDIO = 'sound';
let interval = null;
let running = false;
let intervalLength = 5000;

const start = () => {
  if (running) {
    return;
  }
  interval = setInterval(() => {
    document.getElementById(AUDIO).play();
  }, intervalLength);
  running = true;
  toggleButtonDisabledState();
};

const stop = () => {
  clearInterval(interval);
  interval = null;
  running = false;
  toggleButtonDisabledState();
};

const toggleButtonDisabledState = () => {
  const startBtn = document.getElementById(START_BTN);
  const stopBtn = document.getElementById(STOP_BTN);
  if (startBtn.hasAttribute('disabled')) {
    startBtn.removeAttribute('disabled');
    stopBtn.setAttribute('disabled', 'disabled');
  } else {
    stopBtn.removeAttribute('disabled');
    startBtn.setAttribute('disabled', 'disabled');
  }
};

const init = () => {
  document.getElementById(START_BTN).addEventListener('click', () => {
    start();
    ipcRenderer.send('start');
  });
  const stopBtn = document.getElementById(STOP_BTN);
  stopBtn.addEventListener('click', () => {
    stop();
    ipcRenderer.send('stop');
  });
  stopBtn.setAttribute('disabled', 'disabled');
  document
    .getElementById(AUDIO)
    .setAttribute('src', 'assets/audio/notification.wav');

  ipcRenderer.on('start', () => {
    start();
    ipcRenderer.send('start');
  });

  ipcRenderer.on('stop', () => {
    stop();
    ipcRenderer.send('stop');
  });
};

(() => {
  init();
})();
