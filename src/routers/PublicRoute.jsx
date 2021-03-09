import React, { useContext } from "react";
import { Redirect, Route } from "react-router";
import { LoginContext } from "../context/LoginContext";

const PublicRoute = ({ component: Component, ...rest }) => {
    const { userData } = useContext(LoginContext);

    return (
        <Route
            {...rest}
            component={(props) =>
                !!userData.user ? (
                    <Redirect to="/home" />
                ) : (
                    <Component {...props} />
                )
            }
        />
    );
};

export default PublicRoute;
