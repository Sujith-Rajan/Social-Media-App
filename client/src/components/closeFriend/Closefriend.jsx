import React from 'react'
import './closefriend.css'

function Closefriend({user}) {
    const PF = process.env.REACT_APP_PUBLIC_FOLDER
    // console.log(PF+user.profilePicture)
  return (
    <li className="sidebarFriend"> 
    <img crossOrigin='anonymous' className="sidebarFriendImg" src={PF + user.profilePicture} alt="" /> 
    <span className="sidebarFriendName">{user.username}</span>
  </li>
  )
}

export default Closefriend
   