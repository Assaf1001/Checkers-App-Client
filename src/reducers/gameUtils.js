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
