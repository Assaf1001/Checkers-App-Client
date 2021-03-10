import React, { useContext } from "react";
import { GameContext } from "../../../context/GameContext";
import {
    getToAction,
    movePieceAction,
    switchPlayerAction,
} from "../../../actions/gameActions";
import Piece from "./Piece";

const Cell = ({ cell, index }) => {
    const { dispatchGame } = useContext(GameContext);

    const handleClick = () => {
        dispatchGame(getToAction(index));
        dispatchGame(movePieceAction());
        dispatchGame(switchPlayerAction());
    };

    return (
        <div
            onClick={handleClick}
            className={cell.isPlayable ? "light-cell" : "dark-cell"}
        >
            {cell.piece && <Piece piece={cell.piece} index={index} />}
        </div>
    );
};

export default Cell;
