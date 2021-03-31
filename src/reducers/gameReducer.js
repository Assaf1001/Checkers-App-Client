import {
    isLegalSelect,
    playTurn,
    board,
    getIsWhitePlayerTurn,
    getWinner,
    updateBoard,
    getBoard,
    setIsWhitePlayerTurn,
    updateMustCapturePieces,
} from "../game/logic";
import {
    convertLogicBoardToUiBoard,
    convertPieceArrayToIndexs,
    convertUiBoardToLogicBoard,
} from "../game/utils";
import socket from "../socket.io/socket.io";

export const gameInitialState = {
    board: convertLogicBoardToUiBoard(board),
    turn: "white",
    mustCapturePieces: [],
    move: { from: null, to: null },
    winner: null,
    opponent: null,
    userColor: null,
    bb: [],
};

const gameReducer = (state, action) => {
    switch (action.type) {
        case "SET_USER_COLOR":
            return { ...state, userColor: action.userColor };
        case "SET_OPPONENT_SOCKET":
            return { ...state, opponent: action.opponent };
        case "GET_BOARD_SOCKET":
            updateBoard(convertUiBoardToLogicBoard(action.state.board));
            const newBoard = convertLogicBoardToUiBoard(getBoard());

            updateMustCapturePieces(action.state.bb);

            return {
                ...action.state,
                board: newBoard,
                opponent: state.opponent,
                userColor: state.userColor,
            };
        case "SET_TURN":
            setIsWhitePlayerTurn(state.turn);
            return state;
        case "GET_FROM":
            if (state.userColor === state.turn && isLegalSelect(action.from)) {
                return { ...state, move: { from: action.from, to: null } };
            }
            return state;
        case "GET_MUST_CAPTURE_PIECES":
            updateMustCapturePieces(state.bb);
            const piecesArray = convertPieceArrayToIndexs(state.bb);

            return { ...state, mustCapturePieces: piecesArray };
        case "MOVE_PIECE":
            if (state.move.from && action.to) {
                const move = {
                    from: state.move.from,
                    to: action.to,
                };
                const { board, mustCapturePieces } = playTurn(move);
                const newBoard = convertLogicBoardToUiBoard(board);

                return {
                    ...state,
                    board: newBoard,
                    turn: getIsWhitePlayerTurn() ? "white" : "black",
                    move: { from: null, to: null },
                    bb: mustCapturePieces,
                };
            }
            return state;
        case "GET_WINNER":
            return { ...state, winner: getWinner() };
        case "SEND_STATE":
            socket.emit(
                "sendBoard",
                {
                    board: state.board,
                    turn: state.turn,
                    mustCapturePieces: state.mustCapturePieces,
                    move: { from: null, to: null },
                    bb: state.bb,
                },
                state.opponent.id
            );
        default:
            return state;
    }
};

// const gameReducer = (state, action) => {
//     switch (action.type) {
//         // case "SET_ROOM":
//         //     return { ...state, room: action.room };
//         case "SET_OPPONENT_SOCKET":
//             return { ...state, opponent: action.id };
//         // case "GET_BOARD_SOCKET":
//         //     console.log(action.board);
//         //     return { ...state, board: action.board };
//         case "GET_BOARD_SOCKET":
//             updateBoard(convertUiBoardToLogicBoard(action.state.board));
//             const newBoard = convertLogicBoardToUiBoard(getBoard());

//             console.log(newBoard);
//             return {
//                 ...action.state,
//                 board: newBoard,
//                 opponent: state.opponent,
//             };
//         // });
//         case "GET_TURN":
//             console.log(state.turn);
//             setIsWhitePlayerTurn(state.turn);
//             // console.log(state.turn);
//             // const newTurn = getIsWhitePlayerTurn() ? "white" : "black";
//             return state;
//         case "GET_FROM":
//             if (isLegalSelect(action.from)) {
//                 return { ...state, move: { from: action.from, to: null } };
//             }
//             return state;
//         case "GET_MUST_CAPTURE_PIECES":
//             const piecesArray = convertPieceArrayToIndexs(
//                 getMustCapturePieces()
//             );
//             return { ...state, mustCapturePieces: piecesArray };
//         case "MOVE_PIECE":
//             if (state.move.from && action.to) {
//                 const move = {
//                     from: state.move.from,
//                     to: action.to,
//                 };
//                 const board = playTurn(move);
//                 const newBoard = convertLogicBoardToUiBoard(board);
//                 // console.log(state.turn);

//                 socket.emit(
//                     "sendBoard",
//                     {
//                         ...state,
//                         board: newBoard,
//                         turn: getIsWhitePlayerTurn() ? "white" : "black",
//                         move: { from: null, to: null },
//                         opponent: state.opponent.id,
//                     },
//                     state.opponent.id
//                 );

//                 return {
//                     ...state,
//                     board: newBoard,
//                     turn: getIsWhitePlayerTurn() ? "white" : "black",
//                     move: { from: null, to: null }, // is to necesery
//                 };
//             }
//             return state;
//         case "GET_WINNER":
//             return { ...state, winner: getWinner() };
//         default:
//             return state;
//     }
// };

export default gameReducer;
