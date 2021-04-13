import React from "react";

const PlayerDetails = ({ player, title, color }) => (
    <div className="player-details">
        <div
            className={color === "White Player" ? "white-piece" : "black-piece"}
        ></div>
        <h1 className="title">{title}</h1>
        <h2>{color}</h2>
        <h3>User Name: {player.userName}</h3>
        <h3>Level: {player.level}</h3>
        <h3>Rank: {player.rank}</h3>
    </div>
);

export default PlayerDetails;
