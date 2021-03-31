import React from "react";
import Player from "./Player";

const PlayersList = ({ players }) => {
    return (
        <div>
            <h2>Players List</h2>
            {players.map((player) => (
                <Player key={player.id} player={player} />
            ))}
        </div>
    );
};

export default PlayersList;
