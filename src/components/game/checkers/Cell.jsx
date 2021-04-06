import React, { useContext, useEffect, useState } from "react";
import { GameContext } from "../../../context/GameContext";
import {
    getMustCapturePieceAction,
    getToAction,
    getWinnerAction,
    movePieceAction,
    sendStateAction,
} from "../../../actions/gameActions";
import Piece from "./Piece";

const Cell = ({ cell, index, isDesktopMode }) => {
    const { game, dispatchGame } = useContext(GameContext);

    const [className, setClassName] = useState(
        cell.isPlayable ? "light-cell" : "dark-cell"
    );

    useEffect(() => {
        if (game.mustCapturePiecesIndexes.includes(index)) {
            setClassName((current) => current + " highlighted-from");
        } else if (game.move.from === index) {
            setClassName((currunt) => currunt + " highlighted-from");
        } else {
            setClassName(cell.isPlayable ? "light-cell" : "dark-cell");
        }
    }, [game.move.from, index, cell.isPlayable, game.mustCapturePiecesIndexes]);

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

    const dropPiece = (event) => {
        event.preventDefault();
        if (game.move.from) {
            dispatchGame(getToAction(index));
            dispatchGame(movePieceAction(index));
            dispatchGame(getMustCapturePieceAction());
            dispatchGame(getWinnerAction());
            dispatchGame(sendStateAction());
        }
    };

    const handleClick = () => {
        if (game.move.from) {
            dispatchGame(getToAction(index));
            dispatchGame(movePieceAction(index));
            dispatchGame(getMustCapturePieceAction());
            dispatchGame(getWinnerAction());
            dispatchGame(sendStateAction());
        }
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
