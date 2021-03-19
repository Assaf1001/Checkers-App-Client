import React, { useContext, useEffect, useState } from "react";
import { GameContext } from "../../../context/GameContext";
import {
    getMustCapturePieceAction,
    getToAction,
    getWinnerAction,
    movePieceAction,
} from "../../../actions/gameActions";
import Piece from "./Piece";

const Cell = ({ cell, index, isDesktopMode }) => {
    const { game, dispatchGame } = useContext(GameContext);

    const [className, setClassName] = useState(
        cell.isPlayable ? "light-cell" : "dark-cell"
    );

    useEffect(() => {
        if (game.mustCapturePieces.includes(index)) {
            setClassName((current) => current + " highlighted-from");
        } else if (game.move.from === index) {
            setClassName((currunt) => currunt + " highlighted-from");
        } else {
            setClassName(cell.isPlayable ? "light-cell" : "dark-cell");
        }
    }, [game.move.from, index, cell.isPlayable, game.mustCapturePieces]);

    const dropPiece = (event) => {
        event.preventDefault();
        dispatchGame(getToAction(index));
        dispatchGame(movePieceAction(index));
        dispatchGame(getMustCapturePieceAction());
        dispatchGame(getWinnerAction());
    };

    const dragEnter = () => {
        if (game.move.from !== index && cell.isPlayable && !cell.piece) {
            setClassName((current) => current + " highlighted-to");
        }
    };

    const drapLeave = () => {
        if (game.move.from !== index) {
            setClassName(cell.isPlayable ? "light-cell" : "dark-cell");
        }
    };

    const dragOver = (event) => {
        event.preventDefault();
    };

    const handleClick = () => {
        dispatchGame(getToAction(index));
        dispatchGame(movePieceAction(index));
        dispatchGame(getMustCapturePieceAction());
        dispatchGame(getWinnerAction());
    };

    return (
        <>
            {isDesktopMode ? (
                <div
                    onDrop={dropPiece}
                    onDragEnter={dragEnter}
                    onDragLeave={drapLeave}
                    onDragOver={dragOver}
                    className={className}
                >
                    {cell.piece && (
                        <Piece
                            piece={cell.piece}
                            index={index}
                            isDesktopMode={isDesktopMode}
                        />
                    )}
                </div>
            ) : (
                <div onClick={handleClick} className={className}>
                    {cell.piece && (
                        <Piece
                            piece={cell.piece}
                            index={index}
                            isDesktopMode={isDesktopMode}
                        />
                    )}
                </div>
            )}
        </>
    );
};

export default Cell;
