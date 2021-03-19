import React from "react";
import { BrowserRouter, Route, Switch, Redirect } from "react-router-dom";
import PublicRoute from "./PublicRoute.jsx";
import PrivateRoute from "./PrivateRoute.jsx";
import LoginContextProvider from "../context/LoginContext.js";
import Header from "../components/main/Header.jsx";
import Footer from "../components/main/Footer.jsx";
import LoginPage from "../components/login/LoginPage.jsx";
import HomePage from "../components/home/HomePage.jsx";
import NotFoundPage from "../components/main/NotFoundPage.jsx";
import GamePage from "../components/game/GamePage.jsx";
import LobbyPage from "../components/lobby/LobbyPage.jsx";
import GameContextProvider from "../context/GameContext.js";

const AppRouter = () => (
    <BrowserRouter>
        <LoginContextProvider>
            <Header />
            <Switch>
                <Route path="/" exact>
                    <Redirect to="/home" component={HomePage} />
                </Route>
                <Route path="/home" component={HomePage} />

                <PublicRoute path="/login" component={LoginPage} />
                <PrivateRoute path="/lobby" component={LobbyPage} />

                {/* <PrivateRoute path="/game/:id" component={GamePage} /> */}
                <GameContextProvider>
                    <Route path="/game/:id" component={GamePage} />
                </GameContextProvider>

                <Route component={NotFoundPage} />
            </Switch>
            <Footer />
        </LoginContextProvider>
    </BrowserRouter>
);

export default AppRouter;
