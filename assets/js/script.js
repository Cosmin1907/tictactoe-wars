
let grid;

let rows = 9;
let columns = 9;

window.onload = function() {
    setGame();
}

/**
 * Setting up the grid when the game starts
 * by creating the HTML elements
 */
function setGame() {
    grid = [];

    for (let r=0; r < rows; r++) {
        let row = [];
        for (let c = 0; c < columns; c++) {
            //JS 
            row.push('');

            //HTML
            let square = document.createElement("div");
            square.id = r.toString() + "-" + c.toString();
            square.classList.add("square");
            document.getElementById("grid").append(square);
        }
        grid.push(row);
    }
}

