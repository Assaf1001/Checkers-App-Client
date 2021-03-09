import { initializeBoard } from "./boardInitialize";

export const gameInitialState = { board: initializeBoard() };

const gameReducer = (state, action) => {
    switch (action.type) {
        default:
            return state;
    }
};

export default gameReducer;
