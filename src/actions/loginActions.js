export const loginAction = (user = {}, token = {}) => ({
    type: "LOGIN",
    user,
    token,
});

export const logoutAction = () => ({
    type: "LOGOUT",
});

// export const setIdAction = (id) => ({
//     type: "SET_ID",
//     id,
// });
