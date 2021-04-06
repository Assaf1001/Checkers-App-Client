import React, { useContext, useEffect } from "react";
import { setPlayersAction } from "../../actions/playersActions";
import { LobbyContext } from "../../context/LobbyContext";
import { LoginContext } from "../../context/LoginContext";
import { initialPlayersState } from "../../reducers/playersReducer";
import socket, { connectUser } from "../../socket.io/socket.io";
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
            dispatchPlayers(initialPlayersState);
        };
    }, [userData.user, dispatchPlayers]);

    return (
        <div>
            <h1>Lobby Page</h1>
            <div>
                <h2>Me:</h2>
                <h3>{userData.user.userName}</h3>
                <h3>Level: {userData.user.level}</h3>
                <h3>Rank: {userData.user.rank}</h3>
            </div>
            <PlayersList players={players} />
            {messages.isInvitationActive && (
                <InvitationModal player={messages.invitationFrom} />
            )}
        </div>
    );
};

export default LobbyPage;
