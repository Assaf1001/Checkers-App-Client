import React, { useContext } from "react";
import { NavLink, useHistory } from "react-router-dom";
import { logoutAction } from "../../actions/loginActions";
import { LoginContext } from "../../context/LoginContext";
import { deleteUserOnCookie } from "../../cookies/cookies";
import { disconnectUser } from "../../socket.io/socket.io";

const Header = () => {
    const history = useHistory();
    const { userData, dispatchUserData } = useContext(LoginContext);

    const handleLogout = () => {
        dispatchUserData(logoutAction());
        deleteUserOnCookie();
        disconnectUser();
        history.push("/home");
    };

    return (
        <div>
            <div className="header-background"></div>
            <div className="header-container">
                <div className="header-content center">
                    <NavLink to="/home" activeClassName="menu-active">
                        Home
                    </NavLink>
                    <NavLink to="/lobby" activeClassName="menu-active">
                        Lobby
                    </NavLink>
                    <NavLink to="/leaderBoard" activeClassName="menu-active">
                        Leader <br /> Board
                    </NavLink>
                    {userData.user ? (
                        <p onClick={handleLogout}>Logout</p>
                    ) : (
                        <NavLink to="/login" activeClassName="menu-active">
                            Login
                        </NavLink>
                    )}
                </div>
            </div>
        </div>
    );
};

export default Header;
