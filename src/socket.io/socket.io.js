import { io } from "socket.io-client";

const URL = process.env.REACT_APP_SOCKET_URL;
const socket = io(URL, { withCredentials: true, autoConnect: false });

export const connectUser = (user) => {
    socket.connect();
    socket.emit("addUser", user);
};

export const disconnectUser = () => {
    socket.disconnect();
};

export default socket;
