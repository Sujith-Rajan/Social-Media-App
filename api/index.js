const express = require('express');
const app = express();
const mongoose = require('mongoose');
const helmet = require("helmet");
const morgan = require("morgan");
const multer = require("multer");
const bodyParser = require('body-parser')
const cors = require('cors');
const path = require("path");


//ROUTE PATH SETTING
const authRoute = require("./routes/auth.js")
const userRoute = require("./routes/users.js")
const postRoute = require("./routes/posts.js");
const conversationRoute = require("./routes/conversations.js")
const messageRoute = require("./routes/messages.js")

//MONGODB CONNECTION
mongoose.connect('mongodb://127.0.0.1:27017/companyMail').then(()=>{
    console.log("db connected")
})
//MIDDLEWEAR

app.use(express.json());
app.use(helmet());
app.use(morgan("common"));
app.use(bodyParser.json())
app.use(bodyParser.urlencoded({ extended: false }));
app.use(cors());

// SERVE STATIC FILES FORM THE "images/person" DIRECTORY
app.use("/images",express.static(path.join(__dirname,"public/images/")));  

const storage = multer.diskStorage({
  destination:(req,file,cb)=>{ cb(null,"public/images")
},
  filename:(req,file,cb)=>{ cb(null,req.body.name)

  },
})


//POST UPLOADING
const upload = multer({storage:storage})
app.post("/api/upload",upload.single("file"),(req,res)=>{
  try {
    if (!req.file) {
      return res.status(400).json({ error: 'No file uploaded' });
    }
    return res.status(200).json("File uploaded successfully");
  } catch (err) {
    console.error(err);
    return res.status(500).json({ error: 'An error occurred' });
  }
})



//ROUTES
app.use("/api/auth",authRoute);
app.use("/api/users",userRoute);
app.use("/api/posts",postRoute);
app.use("/api/conversations",conversationRoute);
app.use("/api/messages",messageRoute);


//PORT SETTINGS
app.listen(8800,()=>{
    console.log("backend server running")
})