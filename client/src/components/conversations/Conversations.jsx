import "./conversations.css";
import axios from "axios";
import { useState, useEffect } from "react";

const Conversations = ({ conversation, currentUser }) => {
    // console.log(conversation);

    const [user, setUser] = useState(null);
    const PF = process.env.REACT_APP_PUBLIC_FOLDER;

    useEffect(() => {
        const friendId = conversation.members.find((m) => m !== currentUser._id);
        const getUser = async () => {
            try {
                const res = await axios("/api/users?userId=" + friendId);

                setUser(res.data);
                // console.log(res.data)
            } catch (err) {
                console.log(err);
            }
        };
        getUser();
    }, [currentUser, conversation]);
    
    return (
        <div className="conversation">
            {user ? (
                <div>
                    <img
                        crossOrigin="anonymous"
                        src={user?.profilePicture ? PF + user.profilePicture : PF + "/person/noavatar.png"}
                        alt="profile picture"
                        className="conversationImg"
                    />
                    <span className="conversationName">{user?.username}</span>
                </div>
            ) : (
                <div>Loading user data...</div>
            )}
        </div>
    );
};

export default Conversations;
