import React, { useContext, useEffect } from "react";
import { useHistory } from "react-router-dom";
import socket from "../../socket.io/socket.io";
import { LobbyContext } from "../../context/LobbyContext";
import {
    initAction,
    receiveInvitationAction,
} from "../../actions/messagesActions";

const Player = ({ player }) => {
    const history = useHistory();

    const { dispatchMessages } = useContext(LobbyContext);

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
                dispatchMessages(initAction());
                history.push(`/game/${room.id}`);
            });
        }
        return () => {
            isComponentExist = false;
        };
    }, [dispatchMessages, history]);

    return (
        <div className="player">
            <h3>Username: {player.userName}</h3>
            <h3>Level: {player.level}</h3>
            <h3>Rank: {player.rank}</h3>
            <button onClick={onClickInvite}>Invite</button>
        </div>
    );
};

export default Player;
