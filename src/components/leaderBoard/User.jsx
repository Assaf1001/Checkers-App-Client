import React from "react";

const User = ({ user }) => {
    return (
        <div>
            <h3>User Name: {user.userName}</h3>
            <h3>Level: {user.level}</h3>
            <h3>Rank: {user.rank}</h3>
        </div>
    );
};

export default User;
