import './Profile.css'
import Topbar from '../../components/topbar/Topbar'
import Sidebar from '../../components/sidebar/Sidebar'
import Rightbar from '../../components/rightbar/Rightbar'
import React, { Fragment,useEffect,useState } from 'react'
import { useParams } from 'react-router-dom' 
import axios from 'axios'
import Feed  from "../../components/feed/Feed"


function Profile() {

  const PF = process.env.REACT_APP_PUBLIC_FOLDER
 
  const [user,setUser] = useState({})
  const username = useParams().username
  

  useEffect(()=>{
    const fetchUser = async () =>{
      try {
        const res = await axios.get(`/api/users?username=${username}`);
        setUser(res.data);
        // console.log(res.data);
      } catch (error) {
        console.error("Error fetching user data:", error);
      }
    }
    fetchUser();
  },[username])
    // console.log(user)
  return (
   <>
    <Topbar/>
    <div className="profile">
    <Sidebar/>
    <div className="profileRight">
      <div className="profileRightTop">
        <div className="profileCover">
          <img crossOrigin='anonymous' src={user.coverPicture ? PF+user.coverPicture : PF+ "/post/4.jpeg"} alt="coverpic" className="profileCoverImg" />
          <img crossOrigin='anonymous' src={user.profilePicture ? PF + user.profilePicture : PF + "/person/10.jpg"} alt="" className="profileUserImg" />
        </div>
        <div className="profileInfo">
          <h4 className="profileInfoName">{user.username}</h4>
          <span className="profileInfoDesc">{user.desc}</span>
        </div>
      </div>
      <div className="profileRightBottom">
        <Feed username={username}/>
        <Rightbar user={user}/>
      </div>
    </div>
    </div>
    
   </>
  )
}

export default Profile

