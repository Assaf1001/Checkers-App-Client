import React, { useContext } from "react";
import { GameContext } from "../../../context/GameContext";
import Cell from "./Cell";

const Board = () => {
    const { game } = useContext(GameContext);

    return (
        <div className="board">
            {console.log(game)}
            {game.board.map((cell, i) => (
                <Cell key={i} cell={cell} index={i} />
            ))}
        </div>
    );
};

export default Board;
