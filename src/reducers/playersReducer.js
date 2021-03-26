export const initialPlayersState = [];

const playersReducer = (state, action) => {
    switch (action.type) {
        case "SET_PLAYERS":
            return [...action.players];
        default:
            return state;
    }
};

export default playersReducer;
