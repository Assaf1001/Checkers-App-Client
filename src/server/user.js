import Axios from "axios";

const signUpURL = `${process.env.REACT_APP_DB}/users/signup`;
const logInURL = `${process.env.REACT_APP_DB}/users/login`;
const userURL = `${process.env.REACT_APP_DB}/users`;

export const singUp = async ({ userName, email, password }) => {
    try {
        const res = await Axios.post(signUpURL, { userName, email, password });

        return {
            token: res.data.token,
            user: {
                userName: res.data.user.userName,
                email: res.data.user.email,
                level: res.data.user.level,
                rank: res.data.user.rank,
            },
        };
    } catch (err) {
        throw new Error(err.response.data.message);
    }
};

export const logIn = async ({ email, password }) => {
    try {
        const res = await Axios.post(logInURL, { email, password });

        return {
            token: res.data.token,
            user: {
                userName: res.data.user.userName,
                email: res.data.user.email,
                level: res.data.user.level,
                rank: res.data.user.rank,
            },
        };
    } catch (err) {
        if (err.message.includes(400)) {
            throw new Error("Email or Password are invalid!");
        }
    }
};

export const logOutFromAllDevices = async (token) => {
    try {
        const res = await Axios.post(
            `${userURL}/logoutAll/`,
            {},
            { headers: { Authorization: `Bearer ${token}` } }
        );

        return res.data;
    } catch (err) {
        throw new Error(err);
    }
};

export const deleteAccount = async (token) => {
    try {
        const res = await Axios.delete(`${userURL}/me`, {
            headers: { Authorization: `Bearer ${token}` },
        });

        return res.data;
    } catch (err) {
        throw new Error(err);
    }
};

export const editDetails = async (update, token) => {
    try {
        const res = await Axios.patch(
            `${userURL}/me`,
            { update },
            { headers: { Authorization: `Bearer ${token}` } }
        );

        return {
            token: res.data.token,
            user: {
                userName: res.data.user.name,
                email: res.data.user.email,
            },
        };
    } catch (err) {
        throw new Error(err.response.data.message);
    }
};

export const changePassword = async (
    password,
    newPassword,
    repeatedNewPassword,
    token
) => {
    try {
        const res = await Axios.patch(
            `${userURL}/me/changePassword`,
            { password, newPassword, repeatedNewPassword },
            { headers: { Authorization: `Bearer ${token}` } }
        );

        return res.data;
    } catch (err) {
        throw new Error(err.response.data.message);
    }
};
