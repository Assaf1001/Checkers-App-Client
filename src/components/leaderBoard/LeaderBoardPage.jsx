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
            <div className="dark-background"></div>
            <div className="page-container">
                <div className="leaderBoard-content">
                    <h1>Leader Board</h1>
                    <div className="leaderBoard">
                        <h3>User Name</h3>
                        <h3>Level</h3>
                        <h3>Rank</h3>
                        {leaderBoard
                            .sort((a, b) => b.rank - a.rank)
                            .map((user) => (
                                <User key={user.userName} user={user} />
                            ))}
                    </div>
                </div>
            </div>
        </div>
    );
};

export default LeaderBoardPage;
