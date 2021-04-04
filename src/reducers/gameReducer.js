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
    mustCapturePiecesIndexes: [],
    mustCapturePieces: [],
    move: { from: null, to: null },
    winner: null,
    opponent: null,
    userColor: null,
};

const gameReducer = (state, action) => {
    switch (action.type) {
        case "SET_USER_COLOR":
            return { ...state, userColor: action.userColor };
        case "SET_OPPONENT_SOCKET":
            return { ...state, opponent: action.opponent };
        case "GET_STATE_SOCKET":
            updateBoard(convertUiBoardToLogicBoard(action.state.board));
            const newBoard = convertLogicBoardToUiBoard(getBoard());

            updateMustCapturePieces(action.state.mustCapturePieces);

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
            updateMustCapturePieces(state.mustCapturePieces);
            const piecesArray = convertPieceArrayToIndexs(
                state.mustCapturePieces
            );

            return { ...state, mustCapturePiecesIndexes: piecesArray };
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
                    mustCapturePieces,
                };
            }
            return state;
        case "GET_WINNER":
            return { ...state, winner: getWinner() };
        case "SEND_STATE":
            socket.emit(
                "sendState",
                {
                    board: state.board,
                    turn: state.turn,
                    mustCapturePiecesIndexes: state.mustCapturePiecesIndexes,
                    mustCapturePieces: state.mustCapturePieces,
                    move: { from: null, to: null },
                    winner: getWinner(),
                },
                state.opponent.id
            );
            return state;
        default:
            return state;
    }
};

export default gameReducer;
