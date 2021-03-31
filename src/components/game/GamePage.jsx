import React, { useContext, useEffect } from "react";
import Board from "./checkers/Board";

import socket from "../../socket.io/socket.io";
import { useHistory } from "react-router";
import { GameContext } from "../../context/GameContext";
import {
    getBoardSokcetAction,
    setOpponentAction,
    setUserColor,
} from "../../actions/gameActions";
import { LoginContext } from "../../context/LoginContext";

const GamePage = (props) => {
    const history = useHistory();

    const { userData } = useContext(LoginContext);
    const { game, dispatchGame } = useContext(GameContext);

    const gameId = props.match.params.id;

    useEffect(() => {
        socket.emit("getRooms", () => {});

        // if (socket.connected) {
        //     socket.on("receiveRooms", (rooms) => {
        //         for (let room of rooms) {
        //             if (room.id === gameId) {
        //                 if (
        //                     room.player1.id !== socket.id &&
        //                     room.player2.id !== socket.id
        //                 ) {
        //                     history.push("/");
        //                 } else {
        //                     break;
        //                 }
        //             }
        //         }
        //     });
        // } else {
        //     history.push("/");
        // }

        // socket.emit("game");

        // socket.on("gameOn", (room) => {
        // console.log(room);
        // });
        socket.emit("sendRoom");
        socket.on("receiveRoom", ({ room, opponent }) => {
            console.log("receiveRoom");
            dispatchGame(setOpponentAction(opponent));
            if (room.player1.userName === userData.user.userName) {
                dispatchGame(setUserColor("white"));
            } else {
                dispatchGame(setUserColor("black"));
            }
        });

        // socket.on("receiveBoard", (board) => {
        //     dispatchGame(getBoardSokcetAction(board));
        // });
    }, []);

    return (
        <div>
            <h1>Game Page id: {gameId}</h1>
            <Board />
        </div>
    );
};

export default GamePage;
