import { io } from "socket.io-client";

const URL = process.env.REACT_APP_SOCKET_URL;
const socket = io(URL, { withCredentials: true, autoConnect: false });

export const connectUser = (user) => {
    socket.on("connect", () => {});
    socket.connect();
    socket.emit("addUser", user);
};
// export const connectUser = (userName, dispatchUserData, setIdAction) => {
//     socket.on("connect", () => {});
//     socket.connect();
//     socket.emit("addUser", userName);
//     socket.on("getUser", (user) => {
//         dispatchUserData(setIdAction(user));
//     });
// };

export const disconnectUser = () => {
    socket.on("disconnect", () => {
        socket.disconnect();
    });
};

// export const getUsers = ()=>{
//     socket.on('getUsers',(users)=>{

//     })
// }

// export const socketOn = (event) =>
//     new Promise((resolve, reject) => {
//         socket.on(event, (data) => {
//             if (data) resolve(data);
//             else reject("Can't get data!");
//         });
//     });

// export const getUsers = () =>
//     new Promise((resolve, reject) => {
//         socket.on("getUsers", (users) => {
//             if (users) resolve(users);
//             else reject("Can't get users!");
//         });
//     });

export default socket;
