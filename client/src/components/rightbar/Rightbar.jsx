import React, { Fragment, useState, useEffect, useContext } from "react";
import { Add, Remove } from "@mui/icons-material";
import { Link } from "react-router-dom";
import axios from "axios";
import "./rightbar.css";
import Online from "../online/Online";
import { AuthContext } from "../../context/AuthContext";
import { Users } from "../../dummyData";

function Rightbar({ user }) {
    const PF = process.env.REACT_APP_PUBLIC_FOLDER;
    const [friends, setFriends] = useState([]);
    const { user: currentUser, dispatch } = useContext(AuthContext);
    const [followed, setFollowed] = useState(currentUser.followings.includes(user?.id));
    // console.log(user) 
    useEffect(() => {
        const getFriends = async () => {
           try {
            if (user && user._id) {
                const friendList = await axios.get(`/api/users/friends/${user._id}`);
                setFriends(friendList.data);
            }
        } catch (error) {
            console.error("API request failed:", error);
            if (error.response) {
                console.error("Response status:", error.response.status);
                console.error("Response data:", error.response.data);
            }
        }
        };
        getFriends();
    }, [user]);

    const handleClick = async () =>{
       try{
          if(followed){
            await axios.put(`/api/users/${user._id}/unfollow`,{
                userId: currentUser._id
            })
            dispatch({type:"UNFOLLOW",payload: user._id})
          }
          else{
            await axios.put(`/api/users/${user._id}/follow`,{
              userId: currentUser._id  
            })
            dispatch({type:"FOLLOW",payload: user._id})
          }
          setFollowed(!followed)
       }
       catch(error){
        console.log(error)
       }
    }
                

    const HomeRightbar = () => {
        return (
            <Fragment>
                <div className="birthdayContainer">
                    <img src="/assets/gift.png" alt="gift" className="birthdayImg" />
                    <span className="birthdayText">
                        <b>Pola Foster</b>and <b>3 other friend</b> have a birthday today.
                    </span>
                </div>
                <img src="/assets/ad.png" alt="" className="rightbarAd" />
                <h4 className="rightbarTitle">Online Friends</h4>
                <ul className="rightbarFriendList">
                    {Users.map((user) => (
                        <Online key={user.id} user={user} />
                    ))}
                </ul>
            </Fragment>
        );
    };

    const ProfileRightbar = () => {
        return (
            <Fragment>
                {user.username !== currentUser.username && (
                    <button className="rightbarFollowButton" onClick={handleClick}>
                        {followed ? "Unfollow" : "Follow"}
                        {followed ? <Remove /> : <Add />}
                    </button>
                )}

                <h4 className="rightbarTitle">User information</h4>
                <div className="rightbarInfo">
                    <div className="rightbarInfoItem">
                        <span className="rightbarInfoKey">City:</span>
                        <span className="rightbarInfoValue">{user.city}</span>
                    </div>

                    <div className="rightbarInfoItem">
                        <span className="rightbarInfoKey">From:</span>
                        <span className="rightbarInfoValue">{user.from}</span>
                    </div>

                    <div className="rightbarInfoItem">
                        <span className="rightbarInfoKey">Relationship:</span>
                        <span className="rightbarInfoValue">
                            {user.relationship === 1 ? "Single" : user.relationship === 1 ? "Married" : "_"}
                        </span>
                    </div>
                </div>

                <h4 className="rightbarTitle">User friends</h4>
                <div className="rightbarFollowings">
                    {friends.map((friend,index) => (
                        <Link  style={{ textDecoration: "none" }} key={friend.id || index} to={"/profile/" + friend.username}>
                            <div  className="rightbarFollowing">
                                <img crossOrigin="anonymous"
                                    src={friend.profilePicture ? PF + friend.profilePicture : PF + "person/noavatar.png"}
                                    alt="no image"
                                    className="rightbarFollowingImg"
                                />
                                <span className="rightbarFollowingName">{friend.username}</span>
                            </div>
                        </Link>
                    ))}
                </div>
            </Fragment>
        );
    };
    return (
        <div className="rightbar">
            <div className="rightbarWrapper">{user ? <ProfileRightbar /> : <HomeRightbar />}</div>
        </div>
    );
}

export default Rightbar;
