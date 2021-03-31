export const receiveInvitationAction = (sentFrom) => ({
    type: "RECEIVE_INVITATION",
    sentFrom,
});

export const initAction = () => ({
    type: "INIT",
});
