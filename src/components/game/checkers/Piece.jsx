import React, { useContext, useEffect } from "react";
import { GameContext } from "../../../context/GameContext";
import { getFromAction, getTurnAction } from "../../../actions/gameActions.js";

const Piece = ({ piece, index }) => {
    const { game, dispatchGame } = useContext(GameContext);

    useEffect(() => {
        dispatchGame(getTurnAction());
    }, [dispatchGame]);

    const dragPiece = () => {
        dispatchGame(getFromAction(index));
    };

    // const handleClick = (event) => {
    //     event.stopPropagation();
    //     dispatchGame(getFromAction(index));
    // };

    return (
        <div
            draggable={game.turn === piece.color}
            onDragStart={dragPiece}
            className={piece.color === "black" ? "black-piece" : "white-piece"}
        ></div>
    );
};

export default Piece;
