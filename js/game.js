/**
 * Глобальные переменные
 */
let btnBlock = true;
let counterError = 0;
let limit = 10;
let stepUser = 1;
let numberSquare = 0;
let startTime;
let endTime;

/**
 * Расчет итогового времени
 * @returns {*}
 */
function timing() {
    return Math.fround((endTime - startTime) / 1000).toFixed(2);
}


/**
 * Формирует случайное число
 * @returns {number}
 */
function randomNumber() {
    return Math.floor(Math.random() * 36) + 1;
}


/**
 * Попадание в активный квадрат
 */
function hittingTarget(dataTarget) {
    hideSquare(dataTarget);
    limit--;
    stepUser++;
    round();
}

/***
 * Попадание в не активный квадрат
 */
function errorTarget(dataTarget) {
    if (btnBlock) {
        return false;
    }
    dataTarget.classList.add('error-signal');
    setTimeout(() => {
        dataTarget.classList.remove('error-signal');
    }, 200);
    counterError++;
}

/**
 * Показывает активный квадрат
 * @param number
 */
function showSquare(number) {
    let square = document.querySelector(`#square-${number}`);
    square.classList.remove('js-target-error');
    square.classList.add('js-target-for-user');
    square.textContent = `${stepUser}`;
}

/**
 * Скрывает активный квадрат
 */
function hideSquare(dataTarget) {
    dataTarget.classList.remove('js-target-for-user');
    dataTarget.textContent = ``;
    setTimeout(() => {
        dataTarget.classList.add('js-target-error');
    }, 100);

}

/**
 * Шаг игры
 */
function round() {
    let randomNum = randomNumber();
    if (numberSquare !== randomNum) {
        numberSquare = randomNum;
        if (limit !== 0) {
            showSquare(numberSquare);
        } else {
            endGame();
        }
    } else {
        round();
    }
}

/**
 * Перезапуск игры
 */
function restartGame() {
    limit = 10;
    stepUser = 1;
    counterError = 0;
    numberSquare = 0;
    startTime = new Date().getTime();
    endTime = new Date().getTime();
    document.querySelector('.game-board').style.display = 'grid';
    document.querySelector('.start-btn').style.display = 'block';
    const resultText = document.querySelector('.result-game__text');
    resultText ? resultText.style.display = 'none' : false;
    const targetForUser = document.querySelector('.js-target-for-user');
    if (targetForUser) {
        hideSquare(targetForUser)
    }
    btnBlock = true;
}

/**
 * Старт игры
 */
function startGame() {
    if (!btnBlock) {
        return false;
    }
    btnBlock = false;
    startTime = new Date().getTime();
    round();
}

/**
 * Конец игры
 */
function endGame() {
    endTime = new Date().getTime();
    const gameTitle = document.querySelector('.game-title');
    document.querySelector('.game-board').style.display = 'none';
    document.querySelector('.start-btn').style.display = 'none';
    let resultTime = timing();
    let displayResult = `<span class="result-game__text">Вы нашли 10 зеленных квадратов за ${resultTime} секунд. Промахов: ${counterError}</span>`;
    gameTitle.insertAdjacentHTML('afterend', displayResult);
}


document.addEventListener("DOMContentLoaded", () => {
    const body = document.querySelector('body');

    body.addEventListener('click', function (event) {
        const dataTarget = event.target;
        dataTarget.classList.contains('js-start-game') ? startGame(dataTarget) : false;
        dataTarget.classList.contains('js-target-for-user') ? hittingTarget(dataTarget) : false;
        dataTarget.classList.contains('js-target-error') ? errorTarget(dataTarget) : false;
        dataTarget.classList.contains('js-restart-game') ? restartGame(dataTarget) : false;
    })
});