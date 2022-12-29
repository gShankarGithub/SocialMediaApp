const router = require("express").Router();
const User = require("../models/User");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken")


//Register
router.post("/register", async (req, res) => {
    try {
        const userExist = await User.findOne({ email: req.body.email });
        if (userExist) {
            console.log("INNN ");
            let err ="User Already Exist"
            res.status(409).json(err)
        }
        else {
            const salt = await bcrypt.genSalt(10)
            const hashedPassword = await bcrypt.hash(req.body.password, salt)
            //Create user
            const newUser = new User({
                username: req.body.username,
                email: req.body.email,
                password: hashedPassword
            })
            //Save user and respond
            const user = await newUser.save();
            res.status(200).json(user)
        }
        //Generate new password

    } catch (err) {
        res.status(500).json(err)
    }
})

router.post("/login", async (req, res) => {

    try {
        const user = await User.findOne({ email: req.body.email });
        !user && res.status(404).send("User Not Found")

        const validPassword = await bcrypt.compare(req.body.password, user.password)
        !validPassword && res.status(400).json("Wrong Password")

        //JWT test 
        const token = jwt.sign({ id: user._id }, "secretkey")

        const { password, ...others } = user._doc

        res.cookie("accessToken", token, { httpOnly: true }).status(200).json(others)

    } catch (err) {
        res.status(500).json(err)
    }

})

router.post("/logout",(req,res)=>{
    res.clearCookie("accessToken",{
        secure:true,
        sameSite:"none"
    }).status(200).json("User Has Been Logged Out")
})



module.exports = router