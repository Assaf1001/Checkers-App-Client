import { Piece } from "./logic.js";

export const convertLogicBoardToUiBoard = (board) => {
    const newBoard = [];
    board.forEach((row) =>
        row.forEach((cell) => {
            const cellObj = {};
            if (cell) {
                cellObj.piece = {
                    color: cell.isWhite ? "white" : "black",
                    isKing: cell.isKing,
                };
                cellObj.isPlayable = true;
            } else {
                cellObj.piece = null;
                cellObj.isPlayable = cell === null;
            }
            newBoard.push(cellObj);
        })
    );
    return newBoard;
};

export const convertPieceLocationToIndex = ({ row, column }) => {
    return row * 8 + column;
};

export const convertPieceArrayToIndexs = (arr) => {
    return arr.map((location) => convertPieceLocationToIndex(location));
};

export const convertUiBoardToLogicBoard = (board) => {
    const newBoard = [[], [], [], [], [], [], [], []];
    let row = 0,
        column = 0;

    for (let cell of board) {
        if (cell.isPlayable === false) {
            newBoard[row][column] = undefined;
        } else if (cell.isPlayable) {
            if (cell.piece === null) {
                newBoard[row][column] = null;
            } else if (cell.piece.color === "white") {
                if (cell.piece.isKing) {
                    newBoard[row][column] = new Piece(true, true);
                } else {
                    newBoard[row][column] = new Piece(true);
                }
            } else {
                if (cell.piece.isKing) {
                    newBoard[row][column] = new Piece(false, true);
                } else {
                    newBoard[row][column] = new Piece(false);
                }
            }
        }

        column++;
        if (column % 8 === 0) {
            row++;
            column = 0;
        }
    }
    return newBoard;
};

export const convertUndefinedToString = (board) => {
    for (let row = 0; row < 8; row++) {
        for (let column = 0; column < 8; column++) {
            if (board[row][column] === undefined)
                board[row][column] = "undefined";
        }
    }

    return board;
};

export const convertStringToUndefined = (board) => {
    for (let row = 0; row < 8; row++) {
        for (let column = 0; column < 8; column++) {
            if (board[row][column] === "undefined")
                board[row][column] = undefined;
        }
    }
    console.log(board);
    return board;
};
