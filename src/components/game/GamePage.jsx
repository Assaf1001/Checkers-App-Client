import React, { useContext, useEffect } from "react";
import { LoginContext } from "../../context/LoginContext";
import { GameContext } from "../../context/GameContext";
import {
    sendStateAction,
    setOpponentAction,
    setUserColorAction,
    setWinnerAction,
} from "../../actions/gameActions";
import socket, { disconnectUser } from "../../socket.io/socket.io";
import Board from "./checkers/Board";
import GameOverModal from "./GameOverModal";
import PlayerDetails from "./PlayerDetails";
import GameTurn from "./checkers/GameTurn";

const GamePage = () => {
    const { userData } = useContext(LoginContext);
    const { game, dispatchGame } = useContext(GameContext);

    const onClickGiveUp = () => {
        dispatchGame(
            setWinnerAction(game.userColor === "white" ? "black" : "white")
        );
        dispatchGame(sendStateAction());
    };

    useEffect(() => {
        socket.emit("sendRoom");
        socket.on("receiveRoom", ({ room, opponent }) => {
            dispatchGame(setOpponentAction(opponent));
            if (room.player1.userName === userData.user.userName) {
                dispatchGame(setUserColorAction("white"));
            } else {
                dispatchGame(setUserColorAction("black"));
            }
        });

        return () => {
            disconnectUser();
        };
    }, [dispatchGame, userData.user.userName]);

    return (
        <div>
            <div className="dark-background"></div>
            <div className="page-container">
                <div className="gamePage-content">
                    <div className="game">
                        <PlayerDetails
                            player={userData.user}
                            title={"Me"}
                            color={
                                game.userColor === "white"
                                    ? "White Player"
                                    : "Black Player"
                            }
                        />
                        <Board />
                        {game.opponent && (
                            <PlayerDetails
                                player={game.opponent}
                                title={"Opponent"}
                                color={
                                    game.userColor === "white"
                                        ? "Black Player"
                                        : "White Player"
                                }
                            />
                        )}
                    </div>
                    <GameTurn />
                    <button onClick={onClickGiveUp}>Give up</button>
                    {game.winner && <GameOverModal />}
                </div>
            </div>
        </div>
    );
};

export default GamePage;
