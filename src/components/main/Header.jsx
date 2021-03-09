import React, { useContext } from "react";
import { logoutAction } from "../../actions/loginActions";
import { LoginContext } from "../../context/LoginContext";
import { deleteUserOnCookie } from "../../cookies/cookies";

const Header = () => {
    const { userData, dispatchUserData } = useContext(LoginContext);

    const handleLogout = () => {
        dispatchUserData(logoutAction());
        deleteUserOnCookie();
        console.log(userData);
    };

    return (
        <div>
            Header
            <button onClick={handleLogout}>LOGOUT</button>
        </div>
    );
};

export default Header;
