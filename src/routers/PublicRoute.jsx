import React, { useContext } from "react";
import { Redirect, Route } from "react-router";

const PublicRoute = ({ component: Component, ...rest }) => {
    const { userData } = useContext();

    return (
        <Route
            {...rest}
            component={(props) =>
                !!userData.user ? (
                    <Redirect to="/homePage" />
                ) : (
                    <Component {...props} />
                )
            }
        />
    );
};

export default PublicRoute;
