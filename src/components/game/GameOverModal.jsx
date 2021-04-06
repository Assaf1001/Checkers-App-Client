import React, { useContext } from "react";
import { useHistory } from "react-router";
import { loginAction } from "../../actions/loginActions";
import { GameContext } from "../../context/GameContext";
import { LoginContext } from "../../context/LoginContext";
import { saveUserOnCookie } from "../../cookies/cookies";
import { updateLevel, updateRank } from "../../server/user";
import socket from "../../socket.io/socket.io";

const GameOverModal = () => {
    const history = useHistory();
    const { userData, dispatchUserData } = useContext(LoginContext);
    const { game } = useContext(GameContext);

    // const onClickPlayAgain = () => {
    // socket.emit("sendAcception", game.opponent.id);
    // };

    const calculateRankToUpdate = (winnerLevel, looserLevel) => {
        if (winnerLevel === looserLevel) return 100;

        if (winnerLevel < looserLevel) {
            return 100 * (looserLevel - winnerLevel + 1);
        } else {
            return 100 / (winnerLevel + 1 - looserLevel);
        }
    };

    const calculateLevelToUpdate = (rank) => {
        if (rank < 1000) {
            return 1;
        } else if (rank >= 1000 && rank < 2000) {
            return 2;
        } else if (rank >= 2000 && rank < 4000) {
            return 3;
        } else if (rank >= 4000 && rank < 8000) {
            return 4;
        } else if (rank >= 8000) {
            return 5;
        }
    };

    const onClickBackToLobby = () => {
        if (game.winner === game.userColor) {
            const newRank = calculateRankToUpdate(
                userData.user.level,
                game.opponent.level
            );

            updateRank(newRank, userData.token)
                .then((user) => {
                    dispatchUserData(loginAction(user, userData.token));
                    saveUserOnCookie({ user, token: userData.token });

                    const newLevel = calculateLevelToUpdate(user.rank);
                    if (user.level !== newLevel) {
                        updateLevel(newLevel, userData.token)
                            .then((newUser) => {
                                dispatchUserData(
                                    loginAction(newUser, userData.token)
                                );
                                saveUserOnCookie({
                                    newUser,
                                    token: userData.token,
                                });
                            })
                            .catch((err) => {
                                throw new Error(err);
                            });
                    }

                    history.push("/lobby");
                })
                .catch((err) => console.log(err));
        } else {
            history.push("/lobby");
        }
    };

    return (
        <div>
            <h1>Game Over</h1>
            <h2>
                {game.winner === "draw"
                    ? "Its a Draw"
                    : game.winner === game.userColor
                    ? "You Win!!"
                    : "You Loose!"}
            </h2>
            {/* <button onClick={onClickPlayAgain}>Play again</button> */}
            <button onClick={onClickBackToLobby}>Back to lobby</button>
        </div>
    );
};

export default GameOverModal;
