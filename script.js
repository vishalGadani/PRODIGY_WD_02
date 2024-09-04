let timer;
let running = false;
let elapsedTime = 0;
let startTime;

const display = document.getElementById('display');
const startStopButton = document.getElementById('startStop');
const resetButton = document.getElementById('reset');
const lapButton = document.getElementById('lap');
const lapsContainer = document.getElementById('laps');

function updateTime() {
    elapsedTime = Date.now() - startTime;
    const totalSeconds = Math.floor(elapsedTime / 1000);
    const minutes = Math.floor(totalSeconds / 60);
    const seconds = totalSeconds % 60;
    const milliseconds = Math.floor(elapsedTime % 1000 / 10);
    display.textContent = `${String(minutes).padStart(2, '0')}:${String(seconds).padStart(2, '0')}:${String(milliseconds).padStart(2, '0')}`;
}

startStopButton.addEventListener('click', function() {
    if (!running) {
        startTime = Date.now() - elapsedTime;
        timer = setInterval(updateTime, 10);
        startStopButton.textContent = 'Stop';
        running = true;
    } else {
        clearInterval(timer);
        startStopButton.textContent = 'Start';
        running = false;
    }
});

resetButton.addEventListener('click', function() {
    clearInterval(timer);
    elapsedTime = 0;
    display.textContent = '00:00:00';
    startStopButton.textContent = 'Start';
    running = false;
    lapsContainer.innerHTML = '';
});

lapButton.addEventListener('click', function() {
    if (running) {
        const lapTime = display.textContent;
        const lapElement = document.createElement('div');
        lapElement.textContent = `Lap: ${lapTime}`;
        lapsContainer.appendChild(lapElement);
    }
});
