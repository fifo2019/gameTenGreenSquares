const modalWindow = document.querySelector('.modal-window');
const main = document.querySelector('.main');
let counterHits = 0;
let counterMiss = 0;
let limit = 10;
let currentPosition = 0;
let currentStep = 0;
const level = {
    "easy": 1200,
    "medium": 800,
    "hard": 500
};

function showSquare(number) {
    let parent = document.querySelector(`.square-${number}`);
    parent.classList.add('square-active');
    parent.firstElementChild.classList.add('squaer__text-active');
}

function hideSquare(number) {
    let parent = document.querySelector(`.square-${number}`);
    parent.classList.remove('square-active');
    parent.firstElementChild.classList.remove('squaer__text-active');
}

function round() {
    let number = randomNumber();
    showSquare(number);
    let count = 3;
    //TODO: Сделать обратный отсчёт
    setTimeout(() => {
        hideSquare(number);
    }, `${800}`);
}


function startGame(dataTarget) {
    closeModalWindow();
    setTimeout(() => {
        round();
    }, 1000);
}


function getPosition(dataTarget) {
    return parseInt(dataTarget.firstElementChild.innerHTML)
}


function closeModalWindow() {
    modalWindow.style.display = 'none';
}


function openModalWindow() {
    modalWindow.style.display = 'flex';
}


document.addEventListener("DOMContentLoaded", () => {
    const body = document.querySelector('body');

    body.addEventListener('click', function (event) {
        const dataTarget = event.target;
        dataTarget.classList.contains('js-choise-level') ? openModalWindow() : false;
        dataTarget.classList.contains('js-start-game') ? startGame(dataTarget) : false;
        dataTarget.classList.contains('square') ? getPosition(dataTarget) : false;
        dataTarget.classList.contains('js-icon-close') ? closeModalWindow() : false;
    })
});