import React, { useContext, useEffect } from "react";
import { GameContext } from "../../../context/GameContext";
import {
    getBoardSokcetAction,
    getFromAction,
    getTurnAction,
} from "../../../actions/gameActions.js";

const Piece = ({ piece, index, isDesktopMode }) => {
    const { game, dispatchGame } = useContext(GameContext);
    const isDragabble =
        game.turn === piece.color &&
        (game.mustCapturePieces.length === 0 ||
            game.mustCapturePieces.includes(index));

    // useEffect(() => {
    //     // dispatchGame(getBoardSokcetAction());
    //     dispatchGame(getTurnAction());
    // }, [dispatchGame]);

    const dragPiece = () => {
        dispatchGame(getFromAction(index));
    };

    const handleClick = (event) => {
        event.stopPropagation();
        dispatchGame(getFromAction(index));
    };

    return (
        <>
            {isDesktopMode ? (
                <div
                    draggable={isDragabble}
                    onDragStart={dragPiece}
                    className={
                        piece.color === "black" ? "black-piece" : "white-piece"
                    }
                ></div>
            ) : (
                <div
                    onClick={handleClick}
                    className={
                        piece.color === "black" ? "black-piece" : "white-piece"
                    }
                ></div>
            )}
        </>
    );
};

export default Piece;
