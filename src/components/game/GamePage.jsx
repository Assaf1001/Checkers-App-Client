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
import GameDetails from "./GameDetails";
import GameOverModal from "./GameOverModal";
// import { useHistory } from "react-router";

const GamePage = (props) => {
    // const history = useHistory();
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

    // useEffect(() => {
    //     if (game.opponent) socket.emit("connectionCheck", game.opponent.id);
    // }, [game.opponent]);

    return (
        <div>
            <Board />
            <button onClick={onClickGiveUp}>Give up</button>
            <GameDetails />
            {game.winner && <GameOverModal />}
        </div>
    );
};

export default GamePage;
