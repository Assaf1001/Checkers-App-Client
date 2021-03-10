export const startNewTurnAction = () => ({
    type: "START_NEW_TURN",
});

export const getFromAction = (from) => ({
    type: "GET_FROM",
    from,
});

export const getToAction = (to) => ({
    type: "GET_TO",
    to,
});

export const movePieceAction = () => ({
    type: "MOVE_PIECE",
});

export const switchPlayerAction = () => ({
    type: "SWITCH_PLAYER",
});
