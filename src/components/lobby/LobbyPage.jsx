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
            <div className="dark-background"></div>
            <div className="page-container">
                <div className="lobbyPage-content">
                    <div className="my-account">
                        <h2>My account</h2>
                        <h3>Username: {userData.user.userName}</h3>
                        <h3>Level: {userData.user.level}</h3>
                        <h3>Rank: {userData.user.rank}</h3>
                    </div>
                    <div className="players-online">
                        <h2>Players Online</h2>
                        {players.length === 0 ? (
                            <h3>No players online!</h3>
                        ) : (
                            <PlayersList players={players} />
                        )}
                    </div>
                    {messages.isInvitationActive && (
                        <InvitationModal player={messages.invitationFrom} />
                    )}
                </div>
            </div>
        </div>
    );
};

export default LobbyPage;
