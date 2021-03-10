import React, { useContext } from "react";
import { GameContext } from "../../../context/GameContext";
import { getFromAction } from "../../../actions/gameActions.js";

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
