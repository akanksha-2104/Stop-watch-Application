const display = document.getElementById('display')
const startStopBtn = document.getElementById('startStopBtn')
const resetBtn = document.getElementById('resetBtn');
const lapBtn = document.getElementById('lapBtn');
const lapsContainer = document.getElementById('laps');
const themeToggle = document.getElementById('theme');

let startTime;
let elapsedTime = 0;
let timerInterval;
let running = false;
let lapCount = 0;        

function updateDisplay() {
    const time = new Date(elapsedTime);
    const hours = time.getUTCHours().toString().padStart(2, '0');
    const minutes = time.getUTCMinutes().toString().padStart(2, '0');
    const seconds = time.getUTCSeconds().toString().padStart(2, '0');
    const milliseconds = Math.floor(time.getUTCMilliseconds() / 10).toString().padStart(2, '0');
    
    display.textContent = `${hours}:${minutes}:${seconds}`;
}

function startStop() {
    if (!running) {
        running = true;
        startStopBtn.textContent = 'Stop';
        startStopBtn.style.backgroundColor = "#ea4335";
        
        startTime = Date.now() - elapsedTime;
        timerInterval = setInterval(function() {
            elapsedTime = Date.now() - startTime;
            updateDisplay();
        }, 10); 
    } else {
        running = false;
        startStopBtn.textContent = 'Start';
        startStopBtn.style.backgroundColor = "";
        clearInterval(timerInterval);
    }
}

function reset() {
    if (running) {
        clearInterval(timerInterval);
        running = false;
        startStopBtn.textContent = 'Start';
        startStopBtn.style.backgroundColor = "";
    }
    elapsedTime = 0;
        updateDisplay();
        
        // Clear laps
        lapsContainer.innerHTML = '';
        lapCount = 0;
}

function recordLap() {
    if (running) {
        lapCount++;
        const time = new Date(elapsedTime);
        const hours = time.getUTCHours().toString().padStart(2, '0');
        const minutes = time.getUTCMinutes().toString().padStart(2, '0');
        const seconds = time.getUTCSeconds().toString().padStart(2, '0');
        const milliseconds = Math.floor(time.getUTCMilliseconds() / 10).toString().padStart(2, '0');
        
        const lapTime = `${hours}:${minutes}:${seconds}`;
        
        const lapItem = document.createElement('div');
        lapItem.classList.add('lap-item');
        lapItem.innerHTML = `
            <span class="lap-number">Lap ${lapCount}</span>
            <span class="lap-time">${lapTime}</span>
        `;
        
        lapsContainer.insertBefore(lapItem, lapsContainer.firstChild);
       
        lapItem.style.animation = 'fadeIn 0.5s';
    }
}

function toggleTheme() {
    const body = document.body;
    body.classList.toggle('dark-mode');
    
    if (body.classList.contains('dark-mode')) {
        themeToggle.textContent = '☀️';
    } else {
        themeToggle.textContent = '🌙';
    }
}

startStopBtn.addEventListener('click', startStop);
resetBtn.addEventListener('click', reset);
lapBtn.addEventListener('click', recordLap);
themeToggle.addEventListener('click', toggleTheme);

        
document.addEventListener('keydown', function(event) {
    switch(event.key) {
        case ' ': // Space bar
            startStop();
            event.preventDefault();
            break;
        case 'r': // R key
            reset();
            break;
        case 'l': // L key
            recordLap();
            break;
        case 't': // T key
            toggleTheme();
            break;
    }
});

const style = document.createElement('style');
style.textContent = `
    @keyframes fadeIn {
        from { opacity: 0; transform: translateY(-10px); }
        to { opacity: 1; transform: translateY(0); }
    }
    
    .display, button, .laps {
        animation: fadeIn 0.5s;
    }
`;
document.head.appendChild(style);