import React, { useContext, useEffect } from "react";
import { LoginContext } from "../../context/LoginContext";
import { GameContext } from "../../context/GameContext";
import {
    setOpponentAction,
    setUserColorAction,
} from "../../actions/gameActions";
import socket from "../../socket.io/socket.io";
import Board from "./checkers/Board";

const GamePage = (props) => {
    const { userData } = useContext(LoginContext);
    const { dispatchGame } = useContext(GameContext);

    const gameId = props.match.params.id;

    useEffect(() => {
        socket.emit("getRooms", () => {});

        socket.emit("sendRoom");
        socket.on("receiveRoom", ({ room, opponent }) => {
            dispatchGame(setOpponentAction(opponent));
            if (room.player1.userName === userData.user.userName) {
                dispatchGame(setUserColorAction("white"));
            } else {
                dispatchGame(setUserColorAction("black"));
            }
        });
    }, [dispatchGame, userData.user.userName]);

    return (
        <div>
            <h1>Game Page id: {gameId}</h1>
            <Board />
        </div>
    );
};

export default GamePage;
