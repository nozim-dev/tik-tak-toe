let grid = document.querySelectorAll(".grid");
let restart_btn = document.querySelector(".restart_btn");
let win_message = document.querySelector(".win_message");
let backgroundMusic = new Audio('../music/background.mp3');
let clickSound = new Audio('../music/click.mp3');
let FinishingSound = new Audio('../music/end.mp3');

document.addEventListener("DOMContentLoaded", () => {
    backgroundMusic.play();
    backgroundMusic.loop = true;
}
)

let number = 0;
let winningCombination = [
    [0, 1, 2],
    [3, 4, 5],
    [6, 7, 8],
    [0, 3, 6],
    [1, 4, 7],
    [2, 5, 8],
    [0, 4, 8],
    [2, 4, 6]
];
let winningArray = [];

let isPlayer = false;

// restart tugmasi
restart_btn.addEventListener("click", () => {
    win_message.classList.remove("winMessage_active");
    backgroundMusic.play();
    isPlayer = false;
    grid.forEach((item) => {
        item.innerHTML = "";
        number = 0;
        item.classList.remove("active");
        item.classList.remove("x");
        item.classList.remove("o");
        item.removeEventListener("click", handleClick);
        item.addEventListener("click", handleClick, { once: true })
        item.classList.remove('no-click');
        item.classList.remove("win");
        winningArray = [];

    })
    win_message.innerHTML = "";

})

grid.forEach((item) => {
    item.addEventListener("click", handleClick, { once: true });
});

function handleClick(e) {
    clickSound.play();
    let item = e.target;
    let currentValue = isPlayer ? "O" : "X";
    placeMark(item, currentValue);
    if (checkWin(currentValue)) {
        EndGame(false)
        FinishingSound.play()
        backgroundMusic.pause()
    } else if (isDraw()) {
        EndGame(true)
        FinishingSound.play()
        backgroundMusic.pause()
        item.setPropery("disabled")
    } else {
        swapTurns();
    }
}

function swapTurns() {
    isPlayer = !isPlayer;
}

function isDraw() {
    return [...grid].every(item => {
        return item.innerHTML.includes("X") || item.innerHTML.includes("O")
    })
}


function placeMark(item, currentValue) {
    item.innerHTML = currentValue;
    item.classList.add("active")
    if (currentValue == "X") {
        item.classList.add("x");
    } else {
        item.classList.add("o");
    }
}

function EndGame(draw) {
    if (draw) {
        win_message.innerHTML = "Durang!";
        win_message.classList.add("winMessage_active");
        grid.forEach((item) => {
            item.classList.add('no-click');
        })
    } else {
        let reduceArray = winningArray.splice(-3);
        win_message.innerHTML = isPlayer ? "0 - yutdi" : "X - yutdi";
        win_message.classList.add("winMessage_active");
        grid.forEach((item) => {
            item.classList.add('no-click');
        })
        grid.forEach((element, id) => {
            reduceArray.includes(id) ? element.classList.add("win") : ""
        });
    }
}


function checkWin(currentValue) {
    return winningCombination.some(combination => {
        return combination.every(index => {
            winningArray.push(index);
            return grid[index].innerHTML.includes(currentValue);
        })
    })
}