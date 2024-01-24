import React from 'react'
import { PermMedia,Label,Room,EmojiEmotions,Cancel } from '@mui/icons-material'
import './share.css'
import { useContext,useRef,useState } from 'react'
import { AuthContext } from '../../context/AuthContext'
import axios from 'axios'


function Share() {
    const{user} =useContext(AuthContext)
    const PF = process.env.REACT_APP_PUBLIC_FOLDER
    const desc = useRef()
    const[file,setFile] = useState(null)
    
    const submitHandler = async (event) =>{
        event.preventDefault();
        const newPost ={
            userId:user._id,
            desc:desc.current.value,
        }
        if(file){
            const data = new FormData();
            const fileName = Date.now() + file.name;
            data.append("name",fileName)
            data.append("file",file)
            newPost.img = fileName
            try{
                await axios.post("/upoload",data)
            }
            catch(err){
                console.log(err)
            }
        }
        try{
            await axios.post("/api/posts",newPost)
            window.location.reload()
        }
        catch(err){
            console.log(err)
        }
    }


  return (
    <div className='share'>
        <div className="shareWrapper">
            <div className="shareTop">
                <img crossOrigin='anonymous' src={user.profilePicture 
                          ? PF + user.profilePicture
                          :PF + "/person/noavatar.png"} alt="" className="shareProfileImg" />
                <input type="text" className="shareInput" placeholder={"What's in your mind "+user.username+"?"}  ref={desc}/>
            </div>
            <hr className='shareHr'/>
            {
                file && (
                    <div className="shareImgContainer">
                        <img src={URL.createObjectURL(file)} alt="" className="shareImg" />
                        <Cancel className='shareCancelImg' onClick={()=>setFile(null)}/>
                    </div>
                )
            }

            <form action="" className='shareBottom' onSubmit={submitHandler}>
                <div className="shareOptions">
                    <label htmlFor="" className="shareOption">
                    <PermMedia htmlColor='tomato' className='shareICon'/>
                    <span className="shareOptionText">Photo or Video</span>
                    <input
                    style={{display:"none"}}
                        id='file'
                     type="file"
                     accept='.png,.jpeg,.jpg'
                     onChange={(e)=>setFile(e.target.files[0])}
                      />
                    </label>
                    <div className="shareOption">
                        <Label htmlColor='blue' className='shareIcon'/>
                        <span className="shareOptionText">Tag</span>
                    </div>
                    <div className="shareOption">
                        <Room htmlColor='green' className='shareIcon'/>
                        <span className="shareOptionText">Location</span>
                    </div>
                    <div className="shareOption">
                        <EmojiEmotions htmlColor="goldenrod" className="shareIcon" />
                        <span className="shareOptionText">Feelings</span>
                    </div>
                </div>
                <button className='shareButton'>Share</button>
            </form>
        </div>
    </div>
  )
}

export default Share