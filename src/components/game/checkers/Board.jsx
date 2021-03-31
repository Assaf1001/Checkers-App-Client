import React, { useContext, useEffect, useState } from "react";
import {
    getBoardSokcetAction,
    getTurnAction,
} from "../../../actions/gameActions";
import { GameContext } from "../../../context/GameContext";
import {
    getIsWhitePlayerTurn,
    setIsWhitePlayerTurn,
} from "../../../game/logic";
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
        // dispatchGame(getBoardSokcetAction());
    }, [dispatchGame]);

    useEffect(() => {
        socket.on("receiveBoard", (state) => {
            console.log("receiveBoard");
            // console.log(state);
            // setIsWhitePlayerTurn(game.turn);
            dispatchGame(getBoardSokcetAction(state));
            dispatchGame(getTurnAction());
            // console.log(game.turn);
        });
    }, []);

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
