// export const setRoomAction = (room) => ({
//     type: "SET_ROOM",
//     room,
// });

export const setOpponentAction = (id) => ({
    type: "SET_OPPONENT_SOCKET",
    id,
});

export const getBoardSokcetAction = (state) => ({
    type: "GET_BOARD_SOCKET",
    state,
});

export const getTurnAction = () => ({
    type: "GET_TURN",
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
