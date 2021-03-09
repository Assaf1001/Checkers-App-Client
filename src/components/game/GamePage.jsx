import React from "react";

const GamePage = (props) => {
    const gameId = props.match.params.id;

    return <div>Game Page id: {gameId}</div>;
};

export default GamePage;
