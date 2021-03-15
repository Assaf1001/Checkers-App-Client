import {
    isLegalSelect,
    playTurn,
    board,
    getIsWhitePlayerTurn,
    getMustCapturePiece,
} from "../components/game/checkers/logic";
import {
    convertLogicBoardToUiBoard,
    convertPieceArrayToIndexs,
    convertPieceLocationToIndex,
} from "./gameUtils";

export const gameInitialState = {
    board: convertLogicBoardToUiBoard(board),
    turn: "white",
    mustCapturePiece: null,
    move: { from: null, to: null },
};

const gameReducer = (state, action) => {
    switch (action.type) {
        case "GET_TURN":
            const newTurn = getIsWhitePlayerTurn() ? "white" : "black";
            return { ...state, turn: newTurn };
        case "GET_FROM":
            // if (
            // isLegalSelect(action.from) &&
            // (state.mustCapturePiece === null ||
            //     state.mustCapturePiece === action.from)
            // ) {
            if (isLegalSelect(action.from)) {
                return { ...state, move: { from: action.from, to: null } };
            }
            return state;
        case "GET_MUST_CAPTURE_PIECE":
            // const piece = getMustCapturePiece();
            const piecesArray = convertPieceArrayToIndexs(
                getMustCapturePiece()
            );
            console.log(piecesArray);
            if (piecesArray != null) {
                // console.log(piece);
                // const index = convertPieceLocationToIndex(piece);
                return { ...state, mustCapturePiece: piecesArray };
            }
            return { ...state, mustCapturePiece: null };
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
