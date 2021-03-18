class Piece {
    constructor(isWhite) {
        this.isWhite = isWhite;
        this.isKing = false;
    }
}

// prettier-ignore
export const board = [
    [undefined,new Piece(false),undefined,null,undefined,new Piece(false),undefined,new Piece(false)],
    [new Piece(false),undefined,null,undefined,new Piece(false),undefined,null,undefined],
    [undefined,null,undefined,new Piece(false),undefined,null,undefined,null],
    [null,undefined,null,undefined,null,undefined,new Piece(false),undefined],
    [undefined,new Piece(false),undefined,null,undefined,null,undefined,null],
    [new Piece(true),undefined,null,undefined,new Piece(true),undefined,new Piece(true),undefined],
    [undefined,new Piece(true),undefined,new Piece(true),undefined,new Piece(true),undefined,new Piece(true)],
    [null,undefined,new Piece(true),undefined,null,undefined,new Piece(true),undefined],
]
// export const board = [
//     [undefined,new Piece(false),undefined,new Piece(false),undefined,new Piece(false),undefined,new Piece(false)],
//     [new Piece(false),undefined,new Piece(false),undefined,new Piece(false),undefined,new Piece(false),undefined],
//     [undefined,new Piece(false),undefined,new Piece(false),undefined,new Piece(false),undefined,new Piece(false)],
//     [null,undefined,null,undefined,null,undefined,null,undefined],
//     [undefined,null,undefined,null,undefined,null,undefined,null],
//     [new Piece(true),undefined,new Piece(true),undefined,new Piece(true),undefined,new Piece(true),undefined],
//     [undefined,new Piece(true),undefined,new Piece(true),undefined,new Piece(true),undefined,new Piece(true)],
//     [new Piece(true),undefined,new Piece(true),undefined,new Piece(true),undefined,new Piece(true),undefined],
// ]

let isWhitePlayerTurn = false;
let mustCapturePieces = [];

export const getIsWhitePlayerTurn = () => isWhitePlayerTurn;

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
    if (isPromotion({ to })) promotePiece({ to });
};

const executeCapture = ({ from, to }) => {
    executeMove({ from, to });
    board[to.row > from.row ? to.row - 1 : to.row + 1][
        to.column > from.column ? to.column - 1 : to.column + 1
    ] = null;
};

const isPromotion = ({ to }) => {
    return isWhitePlayerTurn ? to.row === 0 : to.row === 7;
};

const promotePiece = ({ to }) => {
    board[to.row][to.column].isKing = true;
};

// prettier-ignore
const getMovementDirections = ({ from, to }) => {
    const vertical = board[from.row][from.column].isKing ? Math.abs(from.row - to.row) :
        (isWhitePlayerTurn ? from.row - to.row : to.row - from.row)
    const horizontal = Math.abs(from.column - to.column);
    return {vertical,horizontal}   
};

// prettier-ignore
const isLegalMove = ({ from, to }) => {
    const {vertical,horizontal} = getMovementDirections({from,to})
    return vertical === 1 && horizontal === 1 && board[to.row][to.column] === null
};

// prettier-ignore
const isCaptureMove = ({from,to}) => {
    const {vertical,horizontal} = getMovementDirections({from,to})
    if(vertical !== 2 || horizontal !== 2) return false

    return (
        (board[isWhitePlayerTurn ? to.row + 1 : to.row - 1][to.column + 1] && 
        board[isWhitePlayerTurn ? to.row + 1 : to.row - 1][to.column + 1].isWhite === !isWhitePlayerTurn ) ||
        (board[isWhitePlayerTurn ? to.row + 1 : to.row - 1][to.column - 1] &&
        board[isWhitePlayerTurn ? to.row + 1 : to.row - 1][to.column - 1].isWhite === !isWhitePlayerTurn ) ||
        board[from.row][from.column].isKing
    )
}

// prettier-ignore
const isPieceCanCapture = (row,column)=>{
        return ( 
            ((isWhitePlayerTurn ? row-2>=0 : row+2<=7) && column-2>=0 && 
            board[isWhitePlayerTurn ? row - 1 : row + 1][column - 1] instanceof Piece &&
            board[isWhitePlayerTurn ? row - 1 : row + 1][column - 1].isWhite === !isWhitePlayerTurn &&
            board[isWhitePlayerTurn ? row - 2 : row + 2][column - 2] === null ) ||
            ((isWhitePlayerTurn ? row-2>=0 : row+2<=7) && column+2<=7 &&
            board[isWhitePlayerTurn ? row - 1 : row + 1][column + 1] instanceof Piece &&
            board[isWhitePlayerTurn ? row - 1 : row + 1][column + 1].isWhite === !isWhitePlayerTurn &&
            board[isWhitePlayerTurn ? row - 2 : row + 2][column + 2] === null )
        )
}

// prettier-ignore
const isKingCanCapture = (row,column)=>{
        return ( 
            (row-2>=0 && column-2>=0 && board[row - 1][column - 1] instanceof Piece &&
            board[row - 1][column - 1].isWhite === !isWhitePlayerTurn && board[row - 2][column - 2] === null ) ||
            (row-2>=0 && column+2<=7 && board[row - 1][column + 1] instanceof Piece &&
            board[row - 1][column + 1].isWhite === !isWhitePlayerTurn && board[row - 2][column + 2] === null ) ||
            (row+2<=7 && column-2>=0 && board[row + 1][column - 1] instanceof Piece &&
            board[row + 1][column - 1].isWhite === !isWhitePlayerTurn && board[row + 2][column - 2] === null ) ||
            (row+2<=7 && column+2<=7 && board[row + 1][column + 1] instanceof Piece &&
            board[row + 1][column + 1].isWhite === !isWhitePlayerTurn && board[row + 2][column + 2] === null )
        )
}

// const isDoubleCaptureActive = ({ row, column }) => {
//     // if(mustCapturePieces === null ) return true

//     return (
//         mustCapturePieces[0].row === row &&
//         mustCapturePieces[0].column === column
//     );
// };

export const getMustCapturePiece = () => mustCapturePieces;

// prettier-ignore
export const findMustCapturePiece =()=>{
    const piecesCanCaptureArray = []
    for (let row = 0;row<8;row++){
        for (let column=0 ; column<8;column++){
            if (board[row][column] == null || board[row][column].isWhite !== isWhitePlayerTurn) continue
                if(board[row][column].isKing)
                    if(isKingCanCapture(row,column)) piecesCanCaptureArray.push ({row,column})
                
                if (isPieceCanCapture(row,column)) piecesCanCaptureArray.push ({row,column})
        }
    }
    return piecesCanCaptureArray
}

export const isLegalSelect = (location) => {
    const { row, column } = convertLocationToRowAndColum(location);
    console.log(row, column);
    if (mustCapturePieces.length !== 0)
        for (let location of mustCapturePieces) {
            if (location.row === row && location.column === column) return true;
        }
    else {
        return (
            board[row][column] !== null &&
            isWhitePlayerTurn === board[row][column].isWhite
        );
    }
};

// export const isLegalDestination = (move) => {
//     if (move.from === null || move.from === move.to) return false;
//     const to = convertLocationToRowAndColum(move.to);
//     return board[to.row][to.column] === null;
// };

export const playTurn = (move) => {
    const from = convertLocationToRowAndColum(move.from);
    const to = convertLocationToRowAndColum(move.to);
    if (mustCapturePieces.length === 0 || isLegalSelect(move.from)) {
        mustCapturePieces = [];
        if (isLegalMove({ from, to })) {
            executeMove({ from, to });
            switchTurn();
        } else if (isCaptureMove({ from, to })) {
            executeCapture({ from, to });
            if (
                isPieceCanCapture(to.row, to.column) ||
                isKingCanCapture(to.row, to.column)
            )
                mustCapturePieces.push(to);
            if (mustCapturePieces.length === 0) switchTurn();
        }
        if (mustCapturePieces.length === 0)
            mustCapturePieces = findMustCapturePiece();
    }
    return board;
};
