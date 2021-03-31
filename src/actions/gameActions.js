// export const setRoomAction = (room) => ({
//     type: "SET_ROOM",
//     room,
// });

export const setOpponentAction = (opponent) => ({
    type: "SET_OPPONENT_SOCKET",
    opponent,
});

export const setUserColor = (userColor) => ({
    type: "SET_USER_COLOR",
    userColor,
});

export const getBoardSokcetAction = (state) => ({
    type: "GET_BOARD_SOCKET",
    state,
});

export const setTurnAction = () => ({
    type: "SET_TURN",
});

export const getFromAction = (from) => ({
    type: "GET_FROM",
    from,
});

export const getToAction = (to) => ({
    type: "GET_TO",
    to,
});

export const getMustCapturePieceAction = () => ({
    type: "GET_MUST_CAPTURE_PIECES",
});

export const movePieceAction = (to) => ({
    type: "MOVE_PIECE",
    to,
});

export const getWinnerAction = () => ({
    type: "GET_WINNER",
});

export const sendStateAction = () => ({
    type: "SEND_STATE",
});
