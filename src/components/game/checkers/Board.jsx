import React, { useContext, useEffect, useState } from "react";
import { GameContext } from "../../../context/GameContext";
import Cell from "./Cell";

const Board = () => {
    const { game } = useContext(GameContext);
    const [isDesktopMode, setIsDesktopMode] = useState(false);

    const onResizeDesktopMode = () => {
        let windowWidth = window.innerWidth;
        if (windowWidth > 768) setIsDesktopMode(true);
        else setIsDesktopMode(false);
    };

    window.addEventListener("resize", onResizeDesktopMode);

    useEffect(() => {
        onResizeDesktopMode();
    }, [isDesktopMode]);

    return (
        <div className="board">
            {console.log(game)}
            {game.board.map((cell, i) => (
                <Cell
                    key={i}
                    cell={cell}
                    index={i}
                    isDesktopMode={isDesktopMode}
                />
            ))}
        </div>
    );
};

export default Board;
