import React, { useContext, useEffect } from "react";
import { LoginContext } from "../../context/LoginContext";
import { connectUser } from "../../socket.io/socket.io";

const LobbyPage = () => {
    const { userData } = useContext(LoginContext);

    useEffect(() => {
        connectUser(userData.user.userName);
    }, [userData.user.userName]);

    return (
        <div>
            <h1>Lobby Page</h1>
            <button>hh</button>
        </div>
    );
};

export default LobbyPage;
