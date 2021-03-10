const setCells = () => {
    const board = [];
    for (let x = 0; x < 8; x++) {
        for (let y = 0; y < 8; y++) {
            let cell = { piece: null };

            if (x % 2 === 0) cell.isPlayable = y % 2 === 0 ? false : true;
            else cell.isPlayable = y % 2 === 0 ? true : false;

            board.push(cell);
        }
    }
    return board;
};

const setPieces = (board) => {
    for (let i = 0; i < board.length; i++) {
        if (i >= 24 && i < 40) continue;
        if (board[i].isPlayable) {
            board[i].piece = i < 24 ? { color: "black" } : { color: "white" };
        }
    }
    return board;
};

// const setPieces = (board) => {
//     for (let i = 0; i < 2; i++) {
//         if (i >= 24 && i < 40) continue;
//         if (board[i].isPlayable) {
//             board[i].piece = i < 24 ? { color: "black" } : { color: "white" };
//         }
//     }
//     return board;
// };

export const initializeBoard = () => {
    const cleanBoard = setCells();
    const board = setPieces(cleanBoard);
    return board;
};
