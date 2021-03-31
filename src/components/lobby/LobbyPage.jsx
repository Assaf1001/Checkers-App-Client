import React, { useContext, useEffect } from "react";
import { setPlayersAction } from "../../actions/playersActions";
import { LobbyContext } from "../../context/LobbyContext";
import { LoginContext } from "../../context/LoginContext";
import socket, { connectUser, disconnectUser } from "../../socket.io/socket.io";
import PlayersList from "./PlayersList";

const LobbyPage = () => {
    const { userData } = useContext(LoginContext);
    const { players, dispatchPlayers } = useContext(LobbyContext);

    useEffect(() => {
        connectUser(userData.user.userName);

        socket.on("getUsers", (users) => {
            dispatchPlayers(setPlayersAction(userData.user, users));
        });

        return () => {
            disconnectUser();
        };
    }, [userData.user, dispatchPlayers]);

    return (
        <div>
            <h1>Lobby Page</h1>
            <PlayersList players={players} />
        </div>
    );
};

export default LobbyPage;
