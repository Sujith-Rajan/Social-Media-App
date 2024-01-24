import React from 'react'
import './online.css'

function Online({user}) {
  
    const PF = process.env.REACT_APP_PUBLIC_FOLDER
   
  return (
    <li className="rightbarFriend">
        <div className="rightbarProfileImgContainer">
            <img  crossOrigin="anonymous" src={PF + user.profilePicture} alt="profil-picture" className="rightbarProfileImg" />
            <span className="rightbarOnline"></span>
        </div>
        <span className="rightbarUSername">{user.username}</span>
    </li>
  )
}

export default Online

