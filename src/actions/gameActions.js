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
    type: "GET_MUST_CAPTURE_PIECE",
});

export const movePieceAction = (to) => ({
    type: "MOVE_PIECE",
    to,
});

// export const getFromAction = (from) => ({
//     type: "GET_FROM",
//     from,
// });

// export const getToAction = (to) => ({
//     type: "GET_TO",
//     to,
// });

// export const movePieceAction = () => ({
//     type: "MOVE_PIECE",
// });
