import React from "react";
import { BrowserRouter, Route, Switch, Redirect } from "react-router-dom";
import PublicRoute from "./PublicRoute.jsx";
import PrivateRoute from "./PrivateRoute.jsx";
import LobbyContextProvider from "../context/LobbyContext.js";
import GameContextProvider from "../context/GameContext.js";
import LoginContextProvider from "../context/LoginContext.js";
import Header from "../components/main/Header.jsx";
import HomePage from "../components/home/HomePage.jsx";
import NotFoundPage from "../components/main/NotFoundPage.jsx";
import LoginPage from "../components/login/LoginPage.jsx";
import LobbyPage from "../components/lobby/LobbyPage.jsx";
import GamePage from "../components/game/GamePage.jsx";
import LeaderBoardPage from "../components/leaderBoard/LeaderBoardPage.jsx";
import MobileHeader from "../components/main/MobileHeader.jsx";

const AppRouter = () => (
    <BrowserRouter>
        <LoginContextProvider>
            <Header />
            <MobileHeader />
            <Switch>
                <Route path="/" exact>
                    <Redirect to="/home" component={HomePage} />
                </Route>
                <Route path="/home" component={HomePage} />
                <Route path="/leaderBoard" component={LeaderBoardPage} />

                <PublicRoute path="/login" component={LoginPage} />
                <LobbyContextProvider>
                    <PrivateRoute path="/lobby" component={LobbyPage} />

                    <GameContextProvider>
                        <PrivateRoute path="/game/:id" component={GamePage} />
                    </GameContextProvider>
                </LobbyContextProvider>

                <Route component={NotFoundPage} />
            </Switch>
        </LoginContextProvider>
    </BrowserRouter>
);

export default AppRouter;
