import {
    getPiece,
    isLegalSelect,
    isLegalDestination,
    isLegalMove,
} from "../components/game/checkers/logic";
import { initializeBoard } from "./boardInitialize";

export const gameInitialState = {
    board: initializeBoard(),
    isWhitePlayerTurn: true,
    isTurnOver: true,
    move: { from: null, to: null },
};

const movePiece = (board, from, to) => {
    const newBoard = board.map((piece) => ({ ...piece }));
    newBoard[to].piece = newBoard[from].piece;
    newBoard[from].piece = null;
    return newBoard;
};

const gameReducer = (state, action) => {
    switch (action.type) {
        case "START_NEW_TURN":
            // if (state.isTurnOver) {
            //     return { ...state, isTurnOver: false };
            // }
            return state;
        case "GET_FROM":
            if (isLegalSelect(state.isWhitePlayerTurn, action.from)) {
                return { ...state, move: { from: action.from, to: null } };
            }
            return state;
        case "GET_TO":
            if (isLegalDestination({ from: state.move.from, to: action.to })) {
                return {
                    ...state,
                    move: { from: state.move.from, to: action.to },
                };
            }
            return state;
        case "SWITCH_PLAYER":
            if (state.isTurnOver) {
                return {
                    ...state,
                    isWhitePlayerTurn: !state.isWhitePlayerTurn,
                };
            }
            return state;
        case "MOVE_PIECE":
            if (isLegalMove(state.move)) {
                const newBoard = movePiece(
                    state.board,
                    state.move.from,
                    state.move.to
                );
                return {
                    ...state,
                    board: newBoard,
                    isTurnOver: true,
                    move: { from: null, to: null },
                };
            }
            return state;

        default:
            return state;
    }
};

export default gameReducer;
