import React, { createContext, useReducer } from "react";
import gameReducer, { gameInitialState } from "../reducers/gameReducer";

export const GameContext = createContext();

const GameContextProvider = (props) => {
    const [game, dispatchGame] = useReducer(gameReducer, gameInitialState);

    return (
        <GameContext.Provider value={{ game, dispatchGame }}>
            {props.children}
        </GameContext.Provider>
    );
};

export default GameContextProvider;
