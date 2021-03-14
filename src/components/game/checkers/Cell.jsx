import React, { useContext } from "react";
import { GameContext } from "../../../context/GameContext";
import { getToAction, movePieceAction } from "../../../actions/gameActions";
import Piece from "./Piece";
import { playTurn } from "./logic";
import { convertLogicBoardToUiBoard } from "../../../reducers/gameUtils";

const Cell = ({ cell, index }) => {
    const { game, dispatchGame } = useContext(GameContext);

    const handleClick = () => {
        dispatchGame(getToAction(index));
        dispatchGame(movePieceAction(index));
        // const board = playTurn({ from: game.move.from, to: index });
        // const newBoard = convertLogicBoardToUiBoard(board);
        // dispatchGame({ type: "A", board: newBoard });
    };

    return (
        <div
            onClick={handleClick}
            className={cell.isPlayable ? "light-cell" : "dark-cell"}
        >
            {cell.piece && <Piece piece={cell.piece} index={index} />}
        </div>
    );
};

export default Cell;
