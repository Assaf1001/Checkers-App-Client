import React, { useContext } from "react";
import { GameContext } from "../../../context/GameContext";
import {
    getFromAction,
    startNewTurnAction,
} from "../../../actions/gameActions.js";
import { a, getA } from "./logic";

const Piece = ({ piece, index }) => {
    const { dispatchGame } = useContext(GameContext);

    const handleClick = (event) => {
        event.stopPropagation();
        dispatchGame(getFromAction(index));
    };

    return (
        <div
            onClick={handleClick}
            className={piece.color === "black" ? "black-piece" : "white-piece"}
        ></div>
    );
};

export default Piece;
