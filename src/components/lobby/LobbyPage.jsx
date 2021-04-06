import React, { useContext, useEffect } from "react";
import { setPlayersAction } from "../../actions/playersActions";
import { LobbyContext } from "../../context/LobbyContext";
import { LoginContext } from "../../context/LoginContext";
import socket, { connectUser, disconnectUser } from "../../socket.io/socket.io";
import InvitationModal from "./InvitationModal";
import PlayersList from "./PlayersList";

const LobbyPage = () => {
    const { userData } = useContext(LoginContext);
    const { messages, players, dispatchPlayers } = useContext(LobbyContext);

    useEffect(() => {
        connectUser(userData.user);

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
            {messages.isInvitationActive && (
                <InvitationModal player={messages.invitationFrom} />
            )}
            <PlayersList players={players} />
        </div>
    );
};

export default LobbyPage;
