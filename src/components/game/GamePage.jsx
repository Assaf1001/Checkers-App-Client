import React, { useContext, useEffect } from "react";
import { LoginContext } from "../../context/LoginContext";
import { GameContext } from "../../context/GameContext";
import {
    setOpponentAction,
    setUserColorAction,
} from "../../actions/gameActions";
import socket from "../../socket.io/socket.io";
import Board from "./checkers/Board";
import GameDetails from "./GameDetails";
import GameOverModal from "./GameOverModal";
import { useHistory } from "react-router";

const GamePage = (props) => {
    const history = useHistory();
    const { userData } = useContext(LoginContext);
    const { game, dispatchGame } = useContext(GameContext);

    const gameId = props.match.params.id;

    useEffect(() => {
        // socket.emit("getRooms", () => {});

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

    // useEffect(() => {
    //     if (game.winner) {
    //         if (game.winner === "draw") {
    //             console.log("Its a draw");
    //         } else {
    //             console.log(game.winner, "Is the winner");
    //         }
    //     }
    // }, [game.winner]);
    useEffect(() => {
        setTimeout(() => {
            setInterval(() => {
                // if (!game.opponent) {
                // console.log("here", game);
                // history.push("/lobby");
                // }
            }, 1000);
        }, 1000);
    }, [game.opponent]);

    // useEffect(() => {
    //     if (game.opponent) socket.emit("connectionCheck", game.opponent.id);
    // }, [game.opponent]);

    return (
        <div>
            <h1>Game Page id: {gameId}</h1>
            <Board />
            <GameDetails />
            {game.winner && <GameOverModal />}
        </div>
    );
};

export default GamePage;
