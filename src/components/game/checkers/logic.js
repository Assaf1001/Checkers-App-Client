class Piece {
    constructor(isWhite) {
        this.isWhite = isWhite;
        this.isKing = false;
    }
}

function Move(from, to) {
    this.from = from;
    this.to = to;
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

export const convertLocationToRowAndColum = (index) => {
    const row = Math.floor(index / 8);
    const column = index % 8;
    return { row, column };
};

export const getPiece = (row, column) => {
    return board[row][column];
};

export const isLegalSelect = (isWhitePlayerTurn, location) => {
    if (location === null) return false;
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

export const isLegalMove = (move) => {
    if (move.from === null || move.to === null) return false;
    const from = convertLocationToRowAndColum(move.from);
    const to = convertLocationToRowAndColum(move.to);

    return true;
};
