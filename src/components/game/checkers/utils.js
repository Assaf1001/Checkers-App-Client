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
    [undefined,undefined,undefined,undefined,undefined,undefined,undefined,undefined],
    [undefined,undefined,undefined,undefined,undefined,undefined,undefined,undefined],
    [new Piece(true),undefined,new Piece(true),undefined,new Piece(true),undefined,new Piece(true),undefined],
    [undefined,new Piece(true),undefined,new Piece(true),undefined,new Piece(true),undefined,new Piece(true)],
    [new Piece(true),undefined,new Piece(true),undefined,new Piece(true),undefined,new Piece(true),undefined],
]

export const getPiece = (row, column) => {
    return board[row][column];
};
