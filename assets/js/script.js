
let grid;

let rows = 9;
let columns = 9;

window.onload = function () {
    setGame();
};

/**
 * Setting up the grid after the page is loaded
 * by visualy creating the HTML elements 
 * and recors each cell based on its position in the grid.
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
}

/**
 * After a move is made, it checks if the player has won, 
 * and if so, it initiates the end-of-game process.
 */
function turn(squareId, player) {
    origBoard[squareId] = player;
    document.getElementById(squareId).innerText = player;
    checkWinner();
}

function checkWinner() {
    //horizontally 
    for (let r = 0; r < rows; r++) {
        for (let c = 0; c < columns - 3; c++) {
            if (grid[r][c] != '') {
                if (grid[r][c] === grid[r][c+1] && 
                    grid[r][c+1] === grid[r][c+2] && 
                    grid[r][c+2] === grid[r][c+3]) {

                    console.log("Player " + grid[r][c] + " wins!");
                    return;
                }
            }
        }
    }
    console.log("No winner yet.");
}

