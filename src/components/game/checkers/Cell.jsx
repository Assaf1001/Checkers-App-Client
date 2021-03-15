import React, { useContext, useEffect, useState } from "react";
import { GameContext } from "../../../context/GameContext";
import {
    getMustCapturePieceAction,
    getToAction,
    movePieceAction,
} from "../../../actions/gameActions";
import Piece from "./Piece";
import { getMustCapturePiece } from "./logic";

const Cell = ({ cell, index }) => {
    const { game, dispatchGame } = useContext(GameContext);

    const [className, setClassName] = useState(
        cell.isPlayable ? "light-cell" : "dark-cell"
    );

    useEffect(() => {
        // dispatchGame(getMustCapturePieceAction());
        if (game.mustCapturePiece === index) {
            setClassName("dark-cell" + " highlighted-from");
        } else if (game.move.from === index) {
            setClassName((currunt) => currunt + " highlighted-from");
        } else {
            setClassName(cell.isPlayable ? "light-cell" : "dark-cell");
        }
    }, [game.move.from, index, cell.isPlayable, game.mustCapturePiece]);

    // useEffect(() => {
    //     if (game.move.from === index) {
    //         setClassName((currunt) => currunt + " highlighted-from");
    //     } else {
    //         setClassName(cell.isPlayable ? "light-cell" : "dark-cell");
    //     }
    // }, [game.move.from, index, cell.isPlayable]);

    // useEffect(() => {
    //     if (game.mustCapturePiece === index) {
    //         console.log("here");
    //         setClassName("dark-cell" + " highlighted-from");
    //     } else {
    //         setClassName("dark-cell");
    //     }
    // }, [game.mustCapturePiece]);

    const dropPiece = (event) => {
        event.preventDefault();
        dispatchGame(getToAction(index));
        dispatchGame(movePieceAction(index));
        dispatchGame(getMustCapturePieceAction());
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
