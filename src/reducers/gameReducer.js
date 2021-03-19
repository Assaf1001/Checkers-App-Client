import {
    isLegalSelect,
    playTurn,
    board,
    getIsWhitePlayerTurn,
    getMustCapturePieces,
    getWinner,
} from "../game/logic";
import {
    convertLogicBoardToUiBoard,
    convertPieceArrayToIndexs,
} from "../game/utils";

export const gameInitialState = {
    board: convertLogicBoardToUiBoard(board),
    turn: "white",
    mustCapturePieces: [],
    move: { from: null, to: null },
    winner: null,
};

const gameReducer = (state, action) => {
    switch (action.type) {
        case "GET_TURN":
            const newTurn = getIsWhitePlayerTurn() ? "white" : "black";
            return { ...state, turn: newTurn };
        case "GET_FROM":
            if (isLegalSelect(action.from)) {
                return { ...state, move: { from: action.from, to: null } };
            }
            return state;
        case "GET_MUST_CAPTURE_PIECES":
            const piecesArray = convertPieceArrayToIndexs(
                getMustCapturePieces()
            );
            return { ...state, mustCapturePieces: piecesArray };
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
        case "GET_WINNER":
            return { ...state, winner: getWinner() };
        default:
            return state;
    }
};

export default gameReducer;
