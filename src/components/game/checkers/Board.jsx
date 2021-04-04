import React, { useContext, useEffect, useState } from "react";
import {
    getStateFromSokcetAction,
    setTurnAction,
} from "../../../actions/gameActions";
import { GameContext } from "../../../context/GameContext";
import socket from "../../../socket.io/socket.io";
import Cell from "./Cell";

const Board = () => {
    const { game, dispatchGame } = useContext(GameContext);
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

    useEffect(() => {
        socket.on("receiveState", (state) => {
            dispatchGame(getStateFromSokcetAction(state));
            dispatchGame(setTurnAction());
        });
    }, [dispatchGame]);

    useEffect(() => {
        if (game.winner) {
            if (game.winner === "draw") {
                console.log("Its a draw");
            } else {
                console.log(game.winner, "Is the winner");
            }
        }
    }, [game.winner]);

    return (
        <div className="board">
            {/* {console.log(game)} */}
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
