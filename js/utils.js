/**
 * Создает площадку игры
 */
function initialPosition() {
    const gameBoard = document.querySelector('.game-board');
    for (let item = 1; item < 37; item++) {
        let square = `<div class="square js-target-error" id="square-${item}"></div>`;
        gameBoard.insertAdjacentHTML('beforeend', square);
    }
}


document.addEventListener("DOMContentLoaded", () => {
    initialPosition();
});