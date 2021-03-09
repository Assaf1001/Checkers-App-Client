import React from "react";
import { getPiece } from "./utils";

const Piece = ({ piece, index }) => {
    const hanleClick = (event) => {
        event.stopPropagation();

        const row = Math.floor(index / 8);
        const column = index % 8;

        console.log("piece", index);
        const piece = getPiece(row, column);
        console.log(piece);
    };

    return (
        <div
            onClick={hanleClick}
            className={piece.color === "black" ? "black-piece" : "white-piece"}
        ></div>
    );
};

export default Piece;
