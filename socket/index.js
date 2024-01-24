const io = require("socket.io")(8900, {
    cors:{
        origin:"http://localhost:3000"
    },
});

let users = [];
 

const addUser = (userId,socketId) => {
    !users.some((user) => user.userId === userId) && 
    users.push({userId,socketId})
}
// REMOVE USER
const removeUser = (socketId) => {
    users = users.filter((user) => user.socketId !== socketId)
}

//GET USER
const getUser = (userId) => {
    return users.find((user) => user.userId === userId)
}

//USER CONNECT
io.on("connection", (socket) =>{
    console.log("user connect")

//TAKE USER_id AND SOCKET_ID FROM USER
socket.on("addUser",(userId) =>{
    addUser(userId,socket.id)
    io.emit("getUsers", users)
})  

//SEND AND GET MESSAGE
socket.on("sendMessage",({senderId,receiverId, text})=>{
    const user = getUser(receiverId)
    
    io.to(user?.socketId).emit("getMessage",{
        senderId,
        text,
    })
})

//WHEN DISCONNECT
socket.on("disconnect", () => {
    console.log("a user disconnected")
    removeUser(socket.id)
    io.emit("getUsers",users)
})  
});
 
  






