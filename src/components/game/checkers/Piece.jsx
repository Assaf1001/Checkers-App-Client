import React, { useContext } from "react";
import { GameContext } from "../../../context/GameContext";
import { getFromAction } from "../../../actions/gameActions.js";

const Piece = ({ piece, index, isDesktopMode }) => {
    const { game, dispatchGame } = useContext(GameContext);
    const isDragabble =
        game.turn === piece.color &&
        game.turn === game.userColor &&
        (game.mustCapturePieces.length === 0 ||
            game.mustCapturePiecesIndexes.includes(index));

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
                        piece.color === "black"
                            ? piece.isKing
                                ? "black-king"
                                : "black-piece"
                            : piece.isKing
                            ? " white-king"
                            : "white-piece"
                    }
                ></div>
            ) : (
                <div
                    onClick={handleClick}
                    className={
                        piece.color === "black"
                            ? piece.isKing
                                ? "black-king"
                                : "black-piece"
                            : piece.isKing
                            ? " white-king"
                            : "white-piece"
                    }
                ></div>
            )}
        </>
    );
};

export default Piece;
