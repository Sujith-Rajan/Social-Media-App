import React from 'react'
import './post.css'
import { useContext,useEffect,useState } from 'react'
import axios from "axios"
import { MoreVert } from '@mui/icons-material'
import {format} from 'timeago.js'
import { Link } from 'react-router-dom'
import { AuthContext } from '../../context/AuthContext'



function Post({post}) {
    const[like, setLike] = useState(post.likes.length)
    const[isLiked,setIsLiked] = useState(false)
    const [user,setUser] = useState({})
    const PF = process.env.REACT_APP_PUBLIC_FOLDER
    const {user:currentUser} = useContext(AuthContext)
    
    useEffect(()=>{
        setIsLiked(post.likes.includes(currentUser._id))
    },[currentUser._id,post.likes])

    useEffect(()=>{
        const fetchUser = async () =>{
            const res = await axios.get(`/api/users?userId=${post.userId}`)
            setUser(res.data)
        }
        fetchUser()
    },[post.userId])

    const likeHandler = ()=>{
        try{
            axios.put("/api/posts/" +post._id+ "/like",{userId : currentUser._id})
        }
        catch(err){
            console.log(err)
        }
        setLike(isLiked ? like-1 : like+1)
        setIsLiked(!isLiked)
    }
    
  return (
    <div className='post'>
        <div className="postWrapper">
            <div className="postTop">
                <div className="postTopLeft">
                    <Link to={`/profile/${user.username}`}>
                    <img crossOrigin='anoymous' src={
                        user.profilePicture ?
                        PF + user.profilePicture 
                        : PF + "/person/noavatar.png"
                        
                    } 
                    className='postProfileImg'
                    alt="profilepic" />
                    </Link>
                    <span className="postUsername">{user.username}</span>
                    <span className="postDate">{format(post.createdAt)}</span>
                </div>
                <div className="postTopRight">
                    <MoreVert/>
                </div>
            </div>
            <div className="postCenter">
                <span className="postText">{post?.desc}</span>
                <img crossOrigin='anoymous' src={post.img ? PF + post.img : PF + "/post/1.jpeg"} alt="post image" className="postImg" />
            </div>
            <div className="postBottom">
                <div className="postBottomLeft">
                    <img crossOrigin='anoymous' src={`${PF}/like.png`} alt="like" className='likeIcon' onClick={likeHandler} />
                    <img  crossOrigin='anoymous' src={`${PF}/heart.png`} alt="unlike" className='likeIcon' onClick={likeHandler} />
                    <span className="postLikeCounter">{like} people like it </span>
                </div>
                <div className="postBottomRight">
                    <span className="postCommentText">{post.comment} comments</span>
                </div>
            </div>
        </div>
    </div>
  )
}

export default Post