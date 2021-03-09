import React, { useContext, useState } from "react";
import { GameContext } from "../../../context/GameContext";
import { initializeBoard } from "../../../reducers/boardInitialize";
import Cell from "./Cell";

const Board = () => {
    const { game } = useContext(GameContext);

    return (
        <div className="board">
            {game.board.map((cell, i) => (
                <Cell key={i} cell={cell} index={i} />
            ))}
        </div>
    );
};

export default Board;
