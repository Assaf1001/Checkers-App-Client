import React, { useContext, useEffect } from "react";
import { useHistory } from "react-router-dom";
import socket from "../../socket.io/socket.io";
import { LobbyContext } from "../../context/LobbyContext";
import {
    initAction,
    receiveInvitationAction,
} from "../../actions/messagesActions";
import InvitationModal from "./InvitationModal";

const Player = ({ player }) => {
    const history = useHistory();

    const { messages, dispatchMessages } = useContext(LobbyContext);

    const onClickInvite = () => {
        socket.emit("sendInvitation", player.id);
    };

    useEffect(() => {
        let isComponentExist = true;

        if (isComponentExist) {
            socket.on("receiveInvitation", (opponent) => {
                dispatchMessages(receiveInvitationAction(opponent));
            });

            socket.on("receiveDecline", (opponent) => {
                if (opponent.id === socket.id) dispatchMessages(initAction());
                else console.log(opponent.userName, "Decline your challange");
            });

            socket.on("receiveAcception", (room) => {
                // if (opponent.id === socket.id) dispatchMessages(initAction());
                // else console.log(opponent.userName, "Accept your challange");
                dispatchMessages(initAction());
                history.push(`/game/${room.id}`);
            });
        }
        return () => {
            isComponentExist = false;
        };
    }, [dispatchMessages, history]);

    return (
        <div>
            <h3>{player.userName}</h3>
            <p>{player.id}</p>
            <button onClick={onClickInvite}>Invite</button>
            {messages.isInvitationActive && (
                <InvitationModal player={messages.invitationFrom} />
            )}
        </div>
    );
};

export default Player;
