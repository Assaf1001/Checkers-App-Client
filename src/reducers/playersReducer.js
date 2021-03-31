export const initialPlayersState = [];

const playersReducer = (state, action) => {
    switch (action.type) {
        case "SET_PLAYERS":
            return action.playersList.filter(
                (player) => player.userName !== action.player.userName
            );
        default:
            return state;
    }
};

export default playersReducer;
