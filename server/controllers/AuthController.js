const bcrypt = require('bcrypt')
const UserModel = require('../models/User')
const jwt = require('jsonwebtoken');
const cookieParser = require("cookie-parser");


const signup = async(req, res) =>{
    try {
        const {name, email, password} = req.body;
        const user = await UserModel.findOne({email})
        if(user){
            return res.status(409).json({msg:"user is already exist, you can login", success:false});
        }
        const userModel = new UserModel({name, email, password});
        userModel.password = await bcrypt.hash(password, 10);
        await userModel.save();
        res.status(201).json({
            msg:"signup successfully",
            success:true
        })
    } catch (error) {
        res.status(500).json({
            msg:"internal server error",
            success:false
        })
    }
}

const login = async(req, res) =>{
    try {
        const {email, password} = req.body;
        const user = await UserModel.findOne({email})
        const errormsg = "Auth failed email and password is wrong";
        if(!user){
            return res.status(409).json({msg: errormsg, success:false});
        }
        const isPassEqual = await bcrypt.compare(password, user.password);
        if(!isPassEqual){
            return res.status(409).json({msg: errormsg, success:false});
        }

        const jwtToken = jwt.sign(
            {email: user.email, _id: user._id },
            process.env.JWT_SECRET,
            { expiresIn: '7d' }
        )

        res.cookie("token", jwtToken, {
            httpOnly: true, // prevents JS access (important for security)
            secure: process.env.JWT_SECRET === "production", // only HTTPS in production
            sameSite: "strict", // CSRF protection
            expires: new Date(Date.now() + 7 * 24 * 60 * 60 * 1000), // 7 days
        })
        res.status(200).json({
            msg:"login success",
            success:true,
            jwtToken,
            email,
            name: user.name
        })
    } catch (error) {
        res.status(500).json({
            msg:"internal server error",
            success:false
        })
    }
}

module.exports = {signup, login}