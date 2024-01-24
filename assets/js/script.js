
let grid;

let rows = 9;
let columns = 9;

window.onload = function() {
    setGame();
}

/**
 * Setting up the grid after the page is loaded
 * by visualy creating the HTML elements 
 * and recors each cell based on its position in the grid.
 */
function setGame() {
    grid = [];

    for (let r=0; r < rows; r++) {
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
}


