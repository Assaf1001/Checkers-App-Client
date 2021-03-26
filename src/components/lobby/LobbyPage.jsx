import React, { useContext, useEffect } from "react";
import { setPlayersAction } from "../../actions/playersActions";
import { LobbyContext } from "../../context/LobbyContext";
import { LoginContext } from "../../context/LoginContext";
import socket, { connectUser, disconnectUser } from "../../socket.io/socket.io";

const LobbyPage = () => {
    const { userData } = useContext(LoginContext);
    const { players, dispatchPlayers } = useContext(LobbyContext);

    // useEffect(() => {
    //     socket.on("getUsers", (users) => {
    //         dispatchPlayers(setPlayersAction(users));
    //     });
    // }, []);

    useEffect(() => {
        connectUser(userData.user.userName);

        socket.on("getUsers", (users) => {
            dispatchPlayers(setPlayersAction(users));
        });

        return () => {
            disconnectUser();
        };
    }, []);

    return (
        <div>
            {console.log(players)}
            <h1>Lobby Page</h1>
            {/* <button onClick={a}>ddd</button> */}
        </div>
    );
};

export default LobbyPage;
