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

const switchTurn = () => {
    isWhitePlayerTurn = !isWhitePlayerTurn;
};

const executeMove = (move) => {
    const from = convertLocationToRowAndColum(move.from);
    const to = convertLocationToRowAndColum(move.to);
    board[to.row][to.column] = board[from.row][from.column];
    board[from.row][from.column] = null;
    console.log(board);
};

export const getIsWhitePlayerTurn = () => isWhitePlayerTurn;

export const convertLocationToRowAndColum = (index) => {
    const row = Math.floor(index / 8);
    const column = index % 8;
    return { row, column };
};

export const getPiece = (row, column) => {
    return board[row][column];
};

export const isLegalSelect = (location) => {
    // if (location === null) return false;
    const { row, column } = convertLocationToRowAndColum(location);
    return (
        board[row][column] !== null &&
        isWhitePlayerTurn === board[row][column].isWhite
    );
};

export const isLegalDestination = (move) => {
    return move.from !== null && move.from !== move.to;
};

export const isLegalMove = (move) => {
    const to = convertLocationToRowAndColum(move.to);

    if (board[to.row][to.column] === null) {
        executeMove(move);
        switchTurn();
        return true;
    }
};
