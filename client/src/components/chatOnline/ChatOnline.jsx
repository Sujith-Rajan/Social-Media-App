import './chatOnline.css'
import axios from 'axios'
import { useEffect,useState } from 'react'

const ChatOnline = ({onlineUsers,currentId,setCurrentChat}) => {
  const[friends,setFriends] = useState([])
  const[onlineFriends,setOnlineFriends] = useState([])
  const PF = process.env.REACT_APP_PUBLIC_FOLDER

  useEffect(()=>{
    const getFriends = async () => {
      const res = await axios.get("/api/users/friends/" + currentId)
      setFriends(res.data)
    }
    getFriends()
  
  },[currentId]);
 
  useEffect(()=>{
    setOnlineFriends(friends.filter((frnd)=> onlineUsers.includes(frnd._id)))
  },[friends,onlineUsers])

  const handleClick = async (user) => {
    try{
      const res = await axios.get(`/api/conversations/find/${currentId}/${user._id}`)
      setCurrentChat(res.data) 
    }
     
    catch(err){
      console.log(err)
    }
  }


  return ( 
    <div className='chatOnline'>
      {onlineFriends.map((onlnfrnd,index)=>(
         <div key={index} className="chatOnlieFriend" onClick={() => handleClick(onlnfrnd)}>
         <div className="ChatOnlineImgContainer">
             <img  crossOrigin='anonymous' src={onlnfrnd?.profilePicture
              ? PF + onlnfrnd.profilePicture
              : PF + "/person/noavatar.png"
             }
              alt="onlineFriend" 
              className="chatOnlineImg" />
             <div className="chatOnlineBadge"></div>
         </div>
         <span className="chatOnleneName">{onlnfrnd?.username}</span>
     </div>

      ))}
       
    </div>
  )
}

export default ChatOnline




