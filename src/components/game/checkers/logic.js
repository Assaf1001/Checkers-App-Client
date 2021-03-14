class Piece {
    constructor(isWhite) {
        this.isWhite = isWhite;
        this.isKing = false;
    }
}

// prettier-ignore
export const board = [
    [undefined,new Piece(false),undefined,null,undefined,new Piece(false),undefined,new Piece(false)],
    [new Piece(false),undefined,new Piece(false),undefined,new Piece(false),undefined,null,undefined],
    [undefined,null,undefined,null,undefined,null,undefined,new Piece(false)],
    [new Piece(false),undefined,null,undefined,null,undefined,new Piece(false),undefined],
    [undefined,new Piece(true),undefined,null,undefined,null,undefined,new Piece(true)],
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
// const executeMove = ({ from, to }) => {
//     board[to.row][to.column] = board[from.row][from.column];
//     board[from.row][from.column] = null;
// };

const executeCapture = ({ from, to }) => {
    executeMove({ from, to });
    board[to.row > from.row ? to.row - 1 : to.row + 1][
        to.column > from.column ? to.column - 1 : to.column + 1
    ] = null;
};

// const executeCapture = ({ from, to }) => {
//     executeMove({ from, to });
//     board[to.row > from.row ? to.row - 1 : to.row + 1][
//         to.column > from.column ? to.column - 1 : to.column + 1
//     ] = null;
// };

const isPromotion = ({ to }) => {
    return isWhitePlayerTurn ? to.row === 0 : to.row === 7;
};

const promotePiece = ({ to }) => {
    board[to.row][to.column].isKing = true;
};

// prettier-ignore
const getMovementDirections = ({ from, to }) => {
    console.log(from,to)
    console.log(board)
    const vertical = board[from.row][from.column].isKing ? Math.abs(from.row - to.row) :
        (isWhitePlayerTurn ? from.row - to.row : to.row - from.row)
    const horizontal = Math.abs(from.column - to.column);
    return {vertical,horizontal}   
};

// prettier-ignore
const isLegalMove = ({ from, to }) => {
    const {vertical,horizontal} = getMovementDirections({from,to})

    return (vertical === 1 && horizontal === 1 && board[to.row][to.column] === null) || 
        (horizontal === 2 && vertical === 2 && isCaptureMove({from,to},{vertical,horizontal}))
};

// prettier-ignore
const isCaptureMove = ({from,to},{vertical,horizontal}) => {
    if ((board[isWhitePlayerTurn ? to.row + 1 : to.row - 1][to.column + 1] && 
            board[isWhitePlayerTurn ? to.row + 1 : to.row - 1][to.column + 1].isWhite === !isWhitePlayerTurn ) ||
            (board[isWhitePlayerTurn ? to.row + 1 : to.row - 1][to.column - 1] &&
            board[isWhitePlayerTurn ? to.row + 1 : to.row - 1][to.column - 1].isWhite === !isWhitePlayerTurn )) {
                isCaptureMoveActive = true;
                return true;
            }else if(board[from.row][from.column].isKing){
                isCaptureMoveActive = true;
                return true
            }
    return false;
}

// prettier-ignore
const isPieceCanCapture = (row,column)=>{
    // console.log(row,column)
    // if(row === 4 && column===7){
    //     console.log((board[isWhitePlayerTurn ? row - 1 : row + 1][column - 1] instanceof Piece &&
    //         board[isWhitePlayerTurn ? row - 1 : row + 1][column - 1].isWhite === !isWhitePlayerTurn &&
    //         board[isWhitePlayerTurn ? row - 2 : row + 2][column - 2] === null ) ||
    //         (board[isWhitePlayerTurn ? row - 1 : row + 1][column + 1] instanceof Piece &&
    //         board[isWhitePlayerTurn ? row - 1 : row + 1][column + 1].isWhite === !isWhitePlayerTurn &&
    //         board[isWhitePlayerTurn ? row - 2 : row + 2][column + 2] === null ))
    //     }
        // if(  ( row-2<0 || row+2>7 || column-2<0 || column+2>7) ) return false
        if(  ( row-2<0 || row+2>7) ) return false

        return ( 
            (column-2>0 &&
            board[isWhitePlayerTurn ? row - 1 : row + 1][column - 1] instanceof Piece &&
            board[isWhitePlayerTurn ? row - 1 : row + 1][column - 1].isWhite === !isWhitePlayerTurn &&
            board[isWhitePlayerTurn ? row - 2 : row + 2][column - 2] === null ) ||
            (column+2<7 &&
            board[isWhitePlayerTurn ? row - 1 : row + 1][column + 1] instanceof Piece &&
            board[isWhitePlayerTurn ? row - 1 : row + 1][column + 1].isWhite === !isWhitePlayerTurn &&
            board[isWhitePlayerTurn ? row - 2 : row + 2][column + 2] === null )
        )
}

// prettier-ignore
const isKingCanCapture = (row,column)=>{
    try{    
        return ( 
            (board[row - 1][column - 1].isWhite === !isWhitePlayerTurn && board[row - 2][column - 2] === null ) ||
            (board[row - 1][column + 1].isWhite === !isWhitePlayerTurn && board[row - 2][column + 2] === null ) ||
            (board[row + 1][column - 1].isWhite === !isWhitePlayerTurn && board[row + 2][column - 2] === null ) ||
            (board[row + 1][column + 1].isWhite === !isWhitePlayerTurn && board[row + 2][column + 2] === null )
        )
    }catch(err){
        return false
    }
}

// prettier-ignore
const findMustCapturePiece =()=>{
    for (let row = 0;row<8;row++){
        for (let column=0 ; column<8;column++){
            if (board[row][column] == null || board[row][column].isWhite !== isWhitePlayerTurn) continue
                // if(board[row][column].isKing){
                //     if(isKingCanCapture(row,column)) return {row,column}
                // }
                if (isPieceCanCapture(row,column)) {
                    console.log(row,column)
                    return {row,column}}
        }
    }
}

export const isLegalSelect = (location) => {
    const { row, column } = convertLocationToRowAndColum(location);
    return (
        board[row][column] !== null &&
        isWhitePlayerTurn === board[row][column].isWhite
    );
};

// export const isLegalDestination = (move) => {
//     if (move.from === null || move.from === move.to) return false;
//     const to = convertLocationToRowAndColum(move.to);
//     return board[to.row][to.column] === null;
// };

export const playTurn = (move) => {
    const from = convertLocationToRowAndColum(move.from);
    const to = convertLocationToRowAndColum(move.to);
    if (isLegalMove({ from, to })) {
        if (isCaptureMoveActive) {
            executeCapture({ from, to });
            isCaptureMoveActive = false;
            if (isPieceCanCapture(to.row, to.column)) switchTurn();
        } else executeMove({ from, to });
        if (isPromotion({ to })) promotePiece({ to });
        switchTurn();
        const mustCapturePiece = findMustCapturePiece();
        console.log(mustCapturePiece);
    }
    return board;
};
