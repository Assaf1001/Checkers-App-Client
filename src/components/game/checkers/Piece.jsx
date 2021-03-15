import React, { useContext, useEffect, useState } from "react";
import { GameContext } from "../../../context/GameContext";
import { getFromAction, getTurnAction } from "../../../actions/gameActions.js";

const Piece = ({ piece, index }) => {
    const { game, dispatchGame } = useContext(GameContext);
    const isDragabble = true;
    // game.turn === piece.color &&
    // (game.mustCapturePiece === null || game.mustCapturePiece === index);

    useEffect(() => {
        dispatchGame(getTurnAction());

        // if (game.mustCapturePiece !== null && game.mustCapturePiece === index) {
        // console.log(game.mustCapturePiece, index);
        // setIsDraggable(game.mustCapturePiece === index);
        // }
        // dispatchGame(getMustCapturePieceAction());
    }, []);

    const dragPiece = () => {
        dispatchGame(getFromAction(index));
    };

    // const handleClick = (event) => {
    //     event.stopPropagation();
    //     dispatchGame(getFromAction(index));
    // };

    return (
        <div
            draggable={isDragabble}
            onDragStart={dragPiece}
            className={piece.color === "black" ? "black-piece" : "white-piece"}
        ></div>
    );
};

export default Piece;
