import "./messenger.css";
import Conversations from "../../components/conversations/Conversations";
import Message from "../../components/message/Message";
import ChatOnline from "../../components/chatOnline/ChatOnline";
import Topbar from "../../components/topbar/Topbar";
import axios from "axios";
import React, { useEffect, useRef, useState } from "react";
import { AuthContext } from "../../context/AuthContext";
import { useContext } from "react";
import { io } from "socket.io-client";



const Messenger = () => {
    const [conversations, setConversations] = useState([]);
    const [currentChat, setCurrentChat] = useState(null);
    const [messages, setMessages] = useState([]);
    const [newMessage, setNewMessage] = useState("");
    const [arrivalMessage, setArrivalMessage] = useState(null);
    const [onlineUsers, setOnlineUsers] = useState([]);
    const socket = useRef();
    const { user } = useContext(AuthContext);
    const scrollRef = useRef();

   
    useEffect(()=>{
        socket.current = io("ws://localhost:8900")
        socket.current.on("getMessage" , (data) =>{
            setArrivalMessage({
                sender: data.senderId,
                text: data.text,
                createdAt: Date.now()
            })
        })
    },[])

    useEffect(()=>{
        arrivalMessage &&
        currentChat?.members.includes(arrivalMessage.sender) &&
        setMessages((prev) =>[...prev, arrivalMessage])
    },[arrivalMessage,currentChat]);


    useEffect(() => {
        socket.current.emit("addUser", user._id)
        socket.current.on("getUsers", (users) =>{
           setOnlineUsers(
            user.followings.filter((f) => users.some((u)=> u.userId === f))
           )
        })
    },[user]);

    

    // =================================== auto scroll==================================================
    useEffect(()=>{
        scrollRef.current?.scrollIntoView({ behavior : "smooth"})
    },[messages]);
    // =========================================get conversations=========================================
    useEffect(() => {
        const getConversations = async () => {
            try {
                const res = await axios.get(`/api/conversations/${user._id}`);
                setConversations(res.data);
                
            } catch (err) {
                console.log(err);
            }
        };
        getConversations();
    }, [user._id]);
  
   
    useEffect(() => {
        const getMessage = async () => {
            try {
                const res = await axios.get(`/api/messages/${currentChat?._id}`);
                setMessages(res.data);
            } catch (err) {
                console.log(err);
            }
        };
        getMessage();
    }, [currentChat]);
        
   
     
    const handleSubmit = async (event) => {
        event.preventDefault();
        const message = {
            conversationId: currentChat._id,
            sender: user._id,
            text: newMessage,
        };

            const receiverId = currentChat.members.find(
                (member) => member !== user._id
            )

            socket.current.emit("sendMessage",{
                senderId: user._id,
                receiverId,
                text:newMessage
            })    

        try {
            const res = await axios.post("/api/messages/", message);
            setMessages([...messages, res.data]);
            setNewMessage("");
        } catch (err) {
            console.log(err);
        }
    };
            



      
       
    return (
        <>
            <Topbar />
            <div className="messenger">
                <div className="chatMenu">
                    <div className="chatMenuWrapper">
                        <input type="text" className="chatMenuInput" placeholder="Search for a friend" />
                        {conversations.map((conv, index) => (
                            <div key={index} onClick={() => setCurrentChat(conv)}>
                                <Conversations conversation={conv} currentUser={user} />
                            </div>
                        ))}
                    </div>
                </div>

                <div className="chatBox">
                    <div className="chatBoxWrapper">
                        {currentChat ? (
                            <>
                                <div className="chatBoxTop">
                                    {messages.map((msg,index) => (
                                        <div ref={scrollRef} key={index}>
                                            <Message message={msg} own={msg.sender === user._id} msgSender={msg.sender}/>
                                        </div>
                                    ))}
                                </div>
                                <div className="chatBoxBottom">
                                    <textarea  className="chatMessageInput"
                                        placeholder='write something....' onChange=
                                        {(event) => setNewMessage(event.target.value)}
                                        value ={newMessage}>
                                    </textarea>
                                    <button className="chatSubmitButton" onClick={handleSubmit}>
                                        Send
                                    </button>
                                </div>
                            </>
                        ) : (
                            <span className="noConversationText">open a conversation to start a chat.</span>
                        )}
                    </div>
                </div>
                <div className="chatOnline">
                    <div className="chatOnlineWrapper">
                        <ChatOnline onlineUsers={onlineUsers} currentId={user._id} setCurrentChat={setCurrentChat} />
                    </div>
                </div>
            </div>
        </>
    );
};

export default Messenger;
