import React from "react";
import Piece from "./Piece";

const Cell = ({ cell, index }) => {
    return (
        <div
            onClick={() => {
                console.log("cell", index);
            }}
            className={cell.isPlayable ? "light-cell" : "dark-cell"}
        >
            {cell.piece && <Piece index={index} piece={cell.piece} />}
        </div>
    );
};
export default Cell;
