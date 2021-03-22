import { io } from "socket.io-client";

const URL = process.env.REACT_APP_SOCKET_URL;
const socket = io(URL, {
    // autoConnect: false,
    withCredentials: true,
    // extraHeaders: { userName },
});

export const connectUser = (userName) => {
    socket.on("connect", () => {
        console.log(userName);
    });
};

export default socket;
