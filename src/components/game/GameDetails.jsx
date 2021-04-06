import React, { useContext } from "react";
import { LoginContext } from "../../context/LoginContext";
import { GameContext } from "../../context/GameContext";

const GameDetails = () => {
    const { userData } = useContext(LoginContext);
    const { game } = useContext(GameContext);

    return (
        <div>
            <h1>
                {game.turn === "white" ? "White" : "Black"} Player Make Your
                Move
            </h1>
            <div>
                <h1>Me</h1>
                <h2>
                    {game.userColor === "white"
                        ? "White Player"
                        : "Black Player"}
                </h2>
                <h3>User Name: {userData.user.userName}</h3>
                <h3>Level: {userData.user.level}</h3>
                <h3>Rank: {userData.user.rank}</h3>
            </div>
            {game.opponent && (
                <div>
                    <h1>Opponent</h1>
                    <h2>
                        {game.userColor === "white"
                            ? "Black Player"
                            : "White Player"}
                    </h2>
                    <h3>User Name: {game.opponent.userName}</h3>
                    <h3>Level: {game.opponent.level}</h3>
                    <h3>Rank: {game.opponent.rank}</h3>
                </div>
            )}
        </div>
    );
};

export default GameDetails;
