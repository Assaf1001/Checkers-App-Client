class Piece {
    constructor(isWhite) {
        this.isWhite = isWhite;
        this.isKing = false;
    }
}

let isWhitePlayerTurn = true;
let winner = null;
let mustCapturePieces = [];
let isDoubleCaptureActive = false;

// prettier-ignore
export const board = [
    [undefined,new Piece(false),undefined,new Piece(false),undefined,new Piece(false),undefined,new Piece(false)],
    [new Piece(false),undefined,new Piece(false),undefined,new Piece(false),undefined,new Piece(false),undefined],
    [undefined,new Piece(false),undefined,new Piece(false),undefined,new Piece(false),undefined,new Piece(false)],
    [null,undefined,null,undefined,null,undefined,null,undefined],
    [undefined,null,undefined,null,undefined,null,undefined,null],
    [new Piece(true),undefined,new Piece(true),undefined,new Piece(true),undefined,new Piece(true),undefined],
    [undefined,new Piece(true),undefined,new Piece(true),undefined,new Piece(true),undefined,new Piece(true)],
    [new Piece(true),undefined,new Piece(true),undefined,new Piece(true),undefined,new Piece(true),undefined],
]

export const getIsWhitePlayerTurn = () => isWhitePlayerTurn;

export const getWinner = () => winner;

export const getMustCapturePieces = () => mustCapturePieces;

export const isLegalSelect = (location) => {
    const { row, column } = convertLocationToRowAndColum(location);
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

// prettier-ignore
export const findMustCapturePieces =()=>{
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

export const playTurn = (move) => {
    const from = convertLocationToRowAndColum(move.from);
    const to = convertLocationToRowAndColum(move.to);
    if (mustCapturePieces.length === 0 || isLegalSelect(move.from)) {
        if (mustCapturePieces.length === 0 && isLegalMove({ from, to })) {
            executeMove({ from, to });
            switchTurn();
            mustCapturePieces = [];
        } else if (isCaptureMove({ from, to })) {
            executeCapture({ from, to });
            mustCapturePieces = [];
            isDoubleCaptureActive = false;
            if (
                isPieceCanCapture(to.row, to.column) ||
                isKingCanCapture(to.row, to.column)
            ) {
                mustCapturePieces.push(to);
                isDoubleCaptureActive = true;
                console.log(isDoubleCaptureActive);
            }
            if (mustCapturePieces.length === 0) switchTurn();
        }
        if (mustCapturePieces.length === 0)
            mustCapturePieces = findMustCapturePieces();
        isGameOver();
    }
    return board;
};

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
    const vertical = board[from.row][from.column].isKing || isDoubleCaptureActive ? Math.abs(from.row - to.row) :
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
        (board[to.row + 1][to.column + 1] && 
        board[to.row + 1][to.column + 1].isWhite === !isWhitePlayerTurn ) ||
        (board[to.row - 1][to.column + 1] && 
        board[to.row - 1][to.column + 1].isWhite === !isWhitePlayerTurn ) ||
        (board[to.row + 1][to.column - 1] &&
        board[to.row + 1][to.column - 1].isWhite === !isWhitePlayerTurn ) ||
        (board[to.row - 1][to.column - 1] &&
        board[to.row - 1][to.column - 1].isWhite === !isWhitePlayerTurn ) 
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

// prettier-ignore
const isPieceCanMove = (row,column)=>{
    return ( 
        ((board[row][column].isWhite ? row-1>=0 : row+1<=7) && column-1>=0 && 
        board[board[row][column].isWhite ? row - 1 : row + 1][column - 1] === null) ||
        ((board[row][column].isWhite ? row-1>=0 : row+1<=7) && column+1<=7 &&
        board[board[row][column].isWhite ? row - 1 : row + 1][column + 1] == null)
    )
}

// prettier-ignore
const isKingCanMove = (row,column)=>{
    return ( 
        (row-1>=0 && column-1>=0 && board[row - 1][column - 1] === null) ||
        (row-1>=0 && column+1<=7 && board[row - 1][column + 1] === null) ||
        (row+2<=7 && column-1>=0 && board[row + 1][column - 1] === null) ||
        (row+1<=7 && column+1<=7 && board[row + 1][column + 1] === null)
    )
}

const isDraw = (whiteKings, blackKings) =>
    (whiteKings === 1 && blackKings <= 2) ||
    (whiteKings <= 2 && blackKings === 1);

// prettier-ignore
const isGameOver = () => {
    let whitePieces = 0,
        blackPieces = 0,
        whiteKings = 0,
        blackKings = 0;

    for (let row = 0; row < 8; row++) {
        for (let column = 0; column < 8; column++) {
            if (board[row][column] == null) continue;

            if (board[row][column].isWhite && (isPieceCanMove(row, column) || isPieceCanCapture(row, column))) 
                whitePieces++;
            else if (board[row][column].isWhite && board[row][column].isKing && (isKingCanMove(row, column) || isKingCanCapture(row, column)))
                whiteKings++;
            else if (!board[row][column].isWhite && (isPieceCanMove(row, column) || isPieceCanCapture(row, column))) 
                blackPieces++;
            else if (!board[row][column].isWhite && board[row][column].isKing && (isKingCanMove(row, column) || isKingCanCapture(row, column)))
                blackKings++;
        }
    }

    if(whitePieces === 0 && whiteKings === 0){
        winner = "black"
        return true
    }else if(blackPieces === 0 && blackKings === 0){
        winner = 'white'
    }else if(isDraw(whiteKings,blackKings)){
        winner = 'draw'
    }

    return false
};
