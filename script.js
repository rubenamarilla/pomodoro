const timer = {
    pomodore: 25,
    shortBreak: 5,
    longBreak: 15,
    longBreakInterval: 4,
};
let interval;
const modeButtons = document.querySelector('#js-mode-buttons');
modeButtons.addEventListener('click', handleMode);

function handleMode(event) {
    const { mode } = event.target.dataset;

    if (!mode) return;
    
    switchMode(mode);
}
function switchMode(mode) {
    timer.mode = mode;
    timer.remainingTime = {
        total: timer[mode] * 60,
        minutes: timer[mode],
        seconds:0,
    };
    document
        .querySelectorAll('button[data-mode]')
        .forEach(e => e.classList.remove('active'));
    document.querySelector(`[data-mode="${mode}"]`);
    document.body.style.backgroundColor = `var(--${mode})`;
    function getRemainingTime(endTime) {
        const currentTime = Date.parse(new Date());
        const difference = endTime - currentTime;
    }
    function starTimer() {
        let { total } = timer.remainingTime;
        const endTime = Date.parse(new Date()) + total * 1000;

        interval = setInterval(function() {
            timer.remainingTime = getRemainingTime(endTime);
            updateClock();

            total = timer.remainingTime.total;
            if (total <= 0) {
                clearInterval(interval);
            }
        }, 1000);
    }
    updateClock();
}
function updateClock() {
    const { remainingTime } = timer;
    const minutes = `${remainingTime.minutes}`.padStart(2, '0');
    const seconds = `${remainingTime.seconds}`.padStart(2, '0');

    const min = document.getElementById('js-minutes');
    const sec = document.getElementById('js-seconds');
    min.textContent = minutes;
    sec.textContent = seconds;
}
