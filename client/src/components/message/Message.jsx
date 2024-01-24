import React, { useEffect, useState } from 'react'
import { format } from 'timeago.js'
import './message.css'
import axios from 'axios'

const Message = ({message, own,msgSender}) => {
 
  const PF = process.env.REACT_APP_PUBLIC_FOLDER
  const[chatImage,setChatImage] = useState('')
  const userId = msgSender;

  useEffect(() => {
    const getFriends = async () => {
       try {
       
            const friendList = await axios.get(`/api/users?userId=${userId}`);
            setChatImage(friendList.data)
            
    } catch (error) {
        console.error("API request failed:", error);
        
    }
    };
    getFriends();
}, [userId]);

  return (
    <div>
        <div className={own ? "message own" : "message"}>
            <img crossOrigin='anonymous' src={chatImage?.profilePicture ? PF + chatImage.profilePicture : ""}
            alt="message" className="messageImg" />
            <p className='messageText'>{message.text}</p>
        </div>
        <div className="messageBottom">
              {format(message.createdAt)} 
        </div>
    </div>
  )
}

export default Message

