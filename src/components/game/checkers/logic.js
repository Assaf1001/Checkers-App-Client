class Piece {
    constructor(isWhite) {
        this.isWhite = isWhite;
        this.isKing = false;
    }
}

// prettier-ignore
const board = [
    [undefined,new Piece(false),undefined,new Piece(false),undefined,new Piece(false),undefined,new Piece(false)],
    [new Piece(false),undefined,new Piece(false),undefined,new Piece(false),undefined,new Piece(false),undefined],
    [undefined,new Piece(false),undefined,new Piece(false),undefined,new Piece(false),undefined,new Piece(false)],
    [null,undefined,null,undefined,null,undefined,null,undefined],
    [undefined,null,undefined,null,undefined,null,undefined,null],
    [new Piece(true),undefined,new Piece(true),undefined,new Piece(true),undefined,new Piece(true),undefined],
    [undefined,new Piece(true),undefined,new Piece(true),undefined,new Piece(true),undefined,new Piece(true)],
    [new Piece(true),undefined,new Piece(true),undefined,new Piece(true),undefined,new Piece(true),undefined],
]

let isWhitePlayerTurn = true;
let isCaptureMoveActive = false;

const switchTurn = () => {
    isWhitePlayerTurn = !isWhitePlayerTurn;
};

const convertLocationToRowAndColum = (index) => {
    const row = Math.floor(index / 8);
    const column = index % 8;
    return { row, column };
};

const executeMove = ({ from, to }) => {
    board[to.row][to.column] = board[from.row][from.column];
    board[from.row][from.column] = null;
};

const executeCapture = ({ from, to }) => {
    board[isWhitePlayerTurn ? to.row + 1 : to.row - 1][
        to.column > from.column ? to.column - 1 : to.column + 1
    ] = null;
};

// prettier-ignore
const isCaptureMove = ({from,to}) => {
    if ((board[isWhitePlayerTurn ? to.row + 1 : to.row - 1][to.column + 1] && 
            board[isWhitePlayerTurn ? to.row + 1 : to.row - 1][to.column + 1].isWhite === !isWhitePlayerTurn &&
            from.column - to.column === 2) ||
            (board[isWhitePlayerTurn ? to.row + 1 : to.row - 1][to.column - 1] &&
            board[isWhitePlayerTurn ? to.row + 1 : to.row - 1][to.column - 1].isWhite === !isWhitePlayerTurn &&
            from.column - to.column === -2)){
                isCaptureMoveActive = true;
                return true;
            }
    return false;
}

const isLegalMove = ({ from, to }) => {
    const vertical = isWhitePlayerTurn ? from.row - to.row : to.row - from.row;
    const horizontal = Math.abs(from.column - to.column);

    return (
        (vertical === 1 && horizontal === 1) ||
        (vertical === 2 && horizontal === 2 && isCaptureMove({ from, to }))
    );
};

export const isLegalSelect = (location) => {
    ////
    const { row, column } = convertLocationToRowAndColum(location);
    return (
        board[row][column] !== null &&
        isWhitePlayerTurn === board[row][column].isWhite
    );
};

export const isLegalDestination = (move) => {
    if (move.from === null || move.from === move.to) return false;
    const to = convertLocationToRowAndColum(move.to);
    return board[to.row][to.column] === null;
};

export const playTurn = (move) => {
    const from = convertLocationToRowAndColum(move.from);
    const to = convertLocationToRowAndColum(move.to);
    if (isLegalMove({ from, to })) {
        executeMove({ from, to });
        if (isCaptureMoveActive) {
            console.log("here");
            executeCapture({ from, to });
            isCaptureMoveActive = false;
        }
        switchTurn();
    }
    return board;
};

// export const getIsWhitePlayerTurn = () => isWhitePlayerTurn;
