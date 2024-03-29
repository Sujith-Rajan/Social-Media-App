const router = require("express").Router();
const User = require("../models/User");
const bcrypt = require("bcrypt");

//REGISTER
router.post("/register", async (req, res, next) => {
    try {
        //generate new password
        bcrypt.hash(req.body.password, 10, (err, hash) => {
            if (err) {
                console.log(err);
                return res.status(500).json({
                    error: err,
                });
            } else {
                //create new user
                const newUser = new User({
                    username: req.body.username,
                    email: req.body.email,  
                    password: hash,
                });
                //save user and respond
                const user = newUser.save();
                res.status(200).json(user);
            }
        });
    } catch (error) {
        console.error(error);
        res.status(500).json({ error: "Internal Server Error" });
    }
});

//LOGIN
router.post('/login',async (req,res,next) =>{
  try{
    const user = await User.findOne({email:req.body.email})
    !user && res.status(404).json("user not found")

    const validPassword = await bcrypt.compare(req.body.password,user.password)
    !validPassword && res.status(404).json("wrong password")

    res.status(200).json(user)
  }catch(err){
    res.status(500).json(err)
  }

})

module.exports = router;
