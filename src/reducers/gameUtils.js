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
    // const indexsArray =[]
    return arr.map((location) => convertPieceLocationToIndex(location));
};
