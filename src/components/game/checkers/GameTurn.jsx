import React, { useContext } from "react";
import { GameContext } from "../../../context/GameContext";

const GameTurn = () => {
    const { game } = useContext(GameContext);

    return (
        <h2>
            {game.turn === "white" ? "White" : "Black"} Player Make Your Move
        </h2>
    );
};

export default GameTurn;
