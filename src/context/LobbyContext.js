import React, { createContext, useReducer } from "react";
import messagesReducer, {
    initialMessagesState,
} from "../reducers/messagesReducer";
import playersReducer, {
    initialPlayersState,
} from "../reducers/playersReducer";

export const LobbyContext = createContext();

const LobbyContextProvider = (props) => {
    const [players, dispatchPlayers] = useReducer(
        playersReducer,
        initialPlayersState
    );

    const [messages, dispatchMessages] = useReducer(
        messagesReducer,
        initialMessagesState
    );

    return (
        <LobbyContext.Provider
            value={{
                players,
                dispatchPlayers,
                messages,
                dispatchMessages,
            }}
        >
            {props.children}
        </LobbyContext.Provider>
    );
};

export default LobbyContextProvider;
