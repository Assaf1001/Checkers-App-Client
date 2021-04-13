import React from "react";

const User = ({ user }) => {
    return (
        <>
            <p>{user.userName}</p>
            <p>{user.level}</p>
            <p>{user.rank}</p>
        </>
    );
};

export default User;
