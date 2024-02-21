const colSelector = document.getElementById("colSelector");
const rowSelector = document.getElementById("rowSelector");
const movementsLabel = document.getElementById("movements-label")
const squares = document.getElementsByClassName("square");
let lastPosition;

/**
 * Changes the board to show the possible movements using the values of the square selected.
 * @param {string} col The col value of the square selected (the letter) 
 * @param {number} row The row value of the square selected (the number)
 */
function squareClicked(col, row){
    resetBoard()
    colSelector.value = col;
    rowSelector.value = row;
    newPositionSelected();
}

/**
 * Changes the board to show the possible movements when the value of one of the selector changes.
 */
function selectChange(){
    resetBoard()
    newPositionSelected();
}

/**
 * Toggles the css classes of the square selected and its possible movements using the values stored at rowSelector and colSelector.
 */
function newPositionSelected(){
    let col = colSelector.value;
    let row = rowSelector.value;
    let possibleMovements = getPossibleMovements(col,row);
    toggleSquareSelection(`${col}${row}`, possibleMovements)
    lastPosition = `${col}${row}`
    movementsLabel.textContent = `Movimientos posibles: ${possibleMovements.toString().replaceAll(',',', ')}`;
}

/**
 * Toggles the css classes of the squares received.
 * @param {string} selectedSquare Toggles the square-selected class of this square.
 * @param {array} possibleMovements Toggles the square-possible class of these squares.
 */
function toggleSquareSelection(selectedSquare, possibleMovements){
    squares.namedItem(selectedSquare).classList.toggle("square-selected");
    possibleMovements.forEach(square => {
        squares.namedItem(square).classList.toggle("square-possible");
    });
}

/**
 * Toggles the css classes of the lastPosition square selected and its possible movements. 
 */
function resetBoard(){
    if (lastPosition !== undefined){
        let possibleMovements = getPossibleMovements(lastPosition[0],lastPosition[1]);
        toggleSquareSelection(lastPosition,possibleMovements);
    }
}

/**
 * Returns an array with all the possible movements of the knight on the col and row received.
 * @param {string} col the col position of the knight.
 * @param {string} row the row position of the knight.
 * @returns an array of strings.
 */
function getPossibleMovements(col, row){
    let possibleMovements = [];
    for (let colIndex = -2; colIndex <= 2; colIndex++) {
        for (let rowIndex = -2; rowIndex <= 2; rowIndex++) {
            if (Math.abs(colIndex) + Math.abs(rowIndex) === 3){
                let newCol = parseInt(col, 18) - 9 + colIndex;
                let newRow = parseInt(row) + rowIndex;
                if (newCol > 0 && newCol < 9 && newRow > 0 && newRow < 9)
                    possibleMovements.push(`${String.fromCharCode(96 + newCol)}${newRow}`);
            }
        }
    }
    return possibleMovements;
}
