const startBtn = document.querySelector('button[data-start]');
const stopBtn = document.querySelector('button[data-stop]');

let timerId = null;

function getRandomHexColor() {
    return `#${Math.floor(Math.random() * 16777215).toString(16)}`;
}

function changeColor () {
    document.body.style.backgroundColor = getRandomHexColor();
}

startBtn.addEventListener('click', () => {
    startBtn.setAttribute("disabled", "disabled");
    timerId = setInterval(() => {
    changeColor();
    }, 1000)
    
    stopBtn.addEventListener('click', () => {
        clearInterval(timerId);
        startBtn.removeAttribute("disabled");
    })
})