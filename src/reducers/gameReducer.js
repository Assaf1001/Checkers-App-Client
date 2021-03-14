import {
    isLegalSelect,
    // isLegalDestination,
    playTurn,
    board,
} from "../components/game/checkers/logic";
import { convertLogicBoardToUiBoard } from "./gameUtils";

export const gameInitialState = {
    board: convertLogicBoardToUiBoard(board),
    move: { from: null, to: null },
};

// const gameReducer = (state, action) => {
//     switch (action.type) {
//         case "GET_FROM":
//             if (isLegalSelect(action.from)) {
//                 return { ...state, move: { from: action.from, to: null } };
//             }
//             return state;
//         case "GET_TO":
//             if (isLegalDestination({ from: state.move.from, to: action.to })) {
//                 console.log("here");
//                 return {
//                     ...state,
//                     move: { from: state.move.from, to: action.to },
//                 };
//             }
//             return state;
//         case "MOVE_PIECE":
//             if (state.move.to && state.move.from) {
//                 const board = playTurn(state.move);
//                 const newBoard = convertLogicBoardToUiBoard(board);
//                 return {
//                     ...state,
//                     board: newBoard,
//                     move: { from: null, to: null },
//                 };
//             }
//             return state;
//         default:
//             return state;
//     }
// };

//
// const gameReducer = (state, action) => {
//     switch (action.type) {
//         case "GET_FROM":
//             if (isLegalSelect(action.from)) {
//                 return { ...state, move: { from: action.from, to: null } };
//             }
//             return state;
//         case "MOVE_PIECE":
//             if (state.move.from && action.to) {
//                 const move = {
//                     from: state.move.from,
//                     to: action.to,
//                 };
//                 const board = playTurn(move);
//                 const newBoard = convertLogicBoardToUiBoard(board);
//                 return {
//                     ...state,
//                     board: newBoard,
//                     move: { from: null, to: null }, // is to necesery
//                 };
//             }
//             return state;
//         case "A":
//             return {
//                 ...state,
//                 board: action.board,
//                 move: { from: null, to: null },
//             };
//         default:
//             return state;
//     }
// };

// good one

const gameReducer = (state, action) => {
    switch (action.type) {
        case "GET_FROM":
            if (isLegalSelect(action.from)) {
                return { ...state, move: { from: action.from, to: null } };
            }
            return state;
        case "MOVE_PIECE":
            if (state.move.from && action.to) {
                const move = {
                    from: state.move.from,
                    to: action.to,
                };
                const board = playTurn(move);
                const newBoard = convertLogicBoardToUiBoard(board);
                return {
                    ...state,
                    board: newBoard,
                    move: { from: null, to: null }, // is to necesery
                };
            }
            return state;
        default:
            return state;
    }
};

export default gameReducer;
