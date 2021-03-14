import React, { useContext, useEffect, useState } from "react";
import { GameContext } from "../../../context/GameContext";
import { getToAction, movePieceAction } from "../../../actions/gameActions";
import Piece from "./Piece";

const Cell = ({ cell, index }) => {
    const { game, dispatchGame } = useContext(GameContext);
    const [className, setClassName] = useState(
        cell.isPlayable ? "light-cell" : "dark-cell"
    );

    useEffect(() => {
        if (game.move.from === index) {
            setClassName((currunt) => currunt + " highlighted-from");
        } else {
            setClassName(cell.isPlayable ? "light-cell" : "dark-cell");
        }
    }, [game.move.from, index, cell.isPlayable]);

    const dropPiece = (event) => {
        event.preventDefault();
        dispatchGame(getToAction(index));
        dispatchGame(movePieceAction(index));
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

    // const handleClick = () => {
    //     dispatchGame(getToAction(index));
    //     dispatchGame(movePieceAction(index));
    // };

    return (
        <div
            onDrop={dropPiece}
            onDragEnter={dragEnter}
            onDragLeave={drapLeave}
            onDragOver={dragOver}
            className={className}
        >
            {cell.piece && <Piece piece={cell.piece} index={index} />}
        </div>
    );
};

export default Cell;
