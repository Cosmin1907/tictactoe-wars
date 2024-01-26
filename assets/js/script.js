
let grid;

let rows = 9;
let columns = 9;

window.onload = function () {
    setGame();
};

/**
 * Setting up the grid after the page is loaded
 * by visualy creating the HTML elements 
 * and records each cell based on its position in the grid.
 */
function setGame() {
    grid = [];

    for (let r = 0; r < rows; r++) {
        let row = [];
        for (let c = 0; c < columns; c++) {
            //JS creates a placeholder
            row.push('');

            //HTML creates a visual representation of the elements on the webpage
            let cell = document.createElement("div");
            cell.id = r.toString() + "-" + c.toString();
            cell.classList.add("cell");
            document.getElementById("grid").append(cell);
        }
        grid.push(row);
    }

    startGame();
}

let origBoard;
const huPlayer = "0";
const aiPlayer = "X";


/**
 * Resets the game to the initial state
 * and initiates turnClick function
 */
function startGame() {
    document.querySelector(".endgame").style.display = "none";
    origBoard = Array.from(Array(81).keys());
    let cells = document.querySelectorAll(".cell");
    for (let i = 0; i < cells.length; i++) {
        cells[i].innerText = '';
        cells[i].style.removeProperty("background-color");
        cells[i].addEventListener("click", turnClick, false);
    }

}

/**
 * Gets triggered when a user clicks on a game square
 * Pases the information about which square was clicked 
 * and which player made the move.
 */
function turnClick(square) {
    turn(square.target.id, huPlayer)
    if (!checkTie()) turn(bestSpot(), aiPlayer);
    
}


function turn(squareId, player) {
    console.log("I am clicking")
    origBoard[squareId] = player;
    document.getElementById(squareId).innerText = player;

    let coords = squareId.split("-");
    let r = parseInt(coords[0]);
    let c = parseInt(coords[1]);

    grid[r][c] = huPlayer;

    checkWinner();
}


/**
 * After a move is made, it checks if the player has won, 
 * and if so, it initiates the end-of-game process.
 */
function checkWinner() {

    console.log("I am checking")
    console.log(grid);
    console.log(origBoard);

    //horizontally 
    for (let r = 0; r < rows; r++) {
        for (let c = 0; c < columns - 3; c++) {
            if (grid[r][c] != '') {
                if (grid[r][c] == grid[r][c+1] && grid[r][c+1] == grid[r][c+2] && grid[r][c+2] == grid[r][c+3]) {
                    console.log("Winner Found horizontally")
                    gameOver();
                    return;
                }
            }
        }
    }

    //vertically 
    for (let c = 0; c < columns; c++) {
        for (let r = 0; r < rows - 3; r++) {
            if (grid[r][c] != '') {
                if (grid[r][c] == grid[r+1][c] && grid[r+1][c] == grid[r+2][c] && grid[r+2][c] == grid[r+3][c]) {
                    console.log("Winner found vertically")
                    gameOver();
                    return;
                }
            }
        }
    }

    //anti diagonally
    for (let r = 0; r < rows - 3; r++) {
        for (let c = 0; c < columns - 3; c++){
            if (grid[r][c] != '') {
                if (grid[r][c] == grid[r+1][c+1] && grid[r+1][c+1] == grid[r+2][c+2] && grid[r+2][c+2] == grid[r+3][c+3]) {
                    console.log("Winner found anti diagonally", r, c)
                    gameOver();
                    return;
                }
            }
        }
        
    }

    //diagonally 
    for (let r = 3; r < rows; r++) {
        for (let c = 0; c < columns - 3; c++) {
            if (grid[r][c] != '') {
                if (grid[r][c] == grid[r-1][c+1] && grid[r-1][c+1] == grid[r-2][c+2] && grid[r-2][c+2] == grid[r-3][c+3]) {
                    console.log("Winner found diagonally", r, c)
                    gameOver();
                    return;
                }
            }
        }
        
    }

}

function gameOver() {
    declareWinner();
}

function declareWinner(who) {
    document.querySelector(".endgame").style.display = "block";
    document.querySelector(".endgame .text").innerText = who;

}

function emptySquares() {
    return origBoard.filter(s => typeof s == "number");
}

function bestSpot() {
    return emptySquares()[0];
}

function checkTie() {
    if (emptySquares().length == 0) {
        for (let i = 0; i < cells.length; i++) {
            cells[i].style.backroundColor = "green";
            cells[i].removeEventListener('click', turnClick, false);
        }
        declareWinner("Tie Game!");
        return true;
    }
    return false;
}


