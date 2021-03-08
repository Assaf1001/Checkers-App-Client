import React, { useContext } from "react";
import { Redirect, Route } from "react-router";

const PrivateRoute = ({ component: Component, ...rest }) => {
    const { userData } = useContext();

    return (
        <Route
            {...rest}
            component={(props) =>
                !!userData.user ? (
                    <Component {...props} />
                ) : (
                    <Redirect to="/loginPage" />
                )
            }
        />
    );
};

export default PrivateRoute;
