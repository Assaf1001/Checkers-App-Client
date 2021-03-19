import React from "react";
import Board from "./checkers/Board";

const GamePage = (props) => {
    const gameId = props.match.params.id;

    return (
        <div>
            <h1>Game Page id: {gameId}</h1>
            <Board />
        </div>
    );
};

export default GamePage;
