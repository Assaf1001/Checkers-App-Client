import {
    isLegalSelect,
    isLegalDestination,
    isLegalMove,
    playTurn,
} from "../components/game/checkers/logic";
import { initializeBoard } from "./boardInitialize";

export const gameInitialState = {
    board: initializeBoard(),
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
        case "GET_FROM":
            if (isLegalSelect(action.from)) {
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
        case "MOVE_PIECE":
            if (playTurn(state.move)) {
                const newBoard = movePiece(
                    state.board,
                    state.move.from,
                    state.move.to
                );
                return {
                    ...state,
                    board: newBoard,
                    move: { from: null, to: null },
                };
            }
            return state;

        default:
            return state;
    }
};

export default gameReducer;
