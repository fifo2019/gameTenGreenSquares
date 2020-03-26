function randomNumber() {
    return Math.floor(Math.random() * 36) + 1;
}

document.addEventListener("DOMContentLoaded", () => {
    const gameBoard = document.querySelector('.game-board');

    initialPosition();

    function initialPosition() {
        for (let item = 1; item < 37; item++) {
            let square = `<div class="square square-${item}"><span class="squaer__text">${item}</span></div>`;
            gameBoard.insertAdjacentHTML('beforeend', square);
        }
    }
});