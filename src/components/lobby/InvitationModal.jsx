import React from "react";
import socket from "../../socket.io/socket.io";

const InvitationModal = ({ player }) => {
    const onClickAccept = () => {
        socket.emit("sendAcception", player.id);
    };

    const onClickDecline = () => {
        socket.emit("sendDecline", player.id);
    };

    return (
        <div className="modal">
            <h4>
                {player.userName} <br /> challenged you for a game
            </h4>
            <button onClick={onClickAccept}>Accept</button>
            <button onClick={onClickDecline}>Decline</button>
        </div>
    );
};

export default InvitationModal;
