export const initialMessagesState = {
    isInvitationActive: false,
    invitationFrom: null,
};

const messagesReducer = (state, action) => {
    switch (action.type) {
        case "RECEIVE_INVITATION":
            return {
                isInvitationActive: true,
                invitationFrom: action.sentFrom,
            };
        case "INIT":
            return initialMessagesState;
        default:
            return initialMessagesState;
    }
};

export default messagesReducer;
