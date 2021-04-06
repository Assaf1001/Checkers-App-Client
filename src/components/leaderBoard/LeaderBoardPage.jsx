import React, { useEffect, useState } from "react";
import { getLeaderBoard } from "../../server/user";
import User from "./User";

const LeaderBoardPage = () => {
    const [leaderBoard, setLeaderBoard] = useState([]);

    useEffect(() => {
        getLeaderBoard()
            .then((leaderBoardData) => setLeaderBoard(leaderBoardData))
            .catch((err) => console.log(err));
    }, []);

    return (
        <div>
            {leaderBoard.map((user) => (
                <User key={user.userName} user={user} />
            ))}
        </div>
    );
};

export default LeaderBoardPage;
