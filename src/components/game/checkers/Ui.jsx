import React from "react";
import GameContextProvider from "../../../context/GameContext";
import Board from "./Board";

const Ui = () => {
    return (
        <div>
            {/* <GameContextProvider> */}
            <Board />
            {/* </GameContextProvider> */}
        </div>
    );
};

export default Ui;
