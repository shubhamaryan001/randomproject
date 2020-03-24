const H_users = require("../models/h_users");
const jwt = require("jsonwebtoken");
const expressJwt = require("express-jwt"); 

require("dotenv").config()

const signUp = async (req,res)=>{
    const userExists = await H_users.findOne({
        username: req.body.username
    })
    if(userExists) return res.status(403).json({error: "User exists already"});
    const user = await new H_users(req.body);
    await user.save(
    res.status(200).json({Message: "User succesfully created please login"}));
}

const singIn = (req,res)=>{
    const {username,password} = req.body
    H_users.findOne({username},(err,user)=>{
        if(err||!user){
            return res.status(401).json({error:"No user found please sign up"});
        }
        if(!user.authenticate(password)){
            return res.status(401).json({error: "Username or Password is wrong"});
        }
        const token =  jwt.sign({_id: user._id},process.env.JWT_SECRET)
        res.cookie("t",token,{expire: new Date()+9999})
        const {_id,username,email} = user;
        return res.json({token, user:{_id,username,email}});
    });
};

const signOut = (req,res)=>{
    res.clearCookie("t");
    return res.json({Message:"User succesfully logged out"});
}

const requireSignin = expressJwt({
    secret: process.env.JWT_SECRET,
    userProperty: "auth"
})

module.exports = {signUp,signOut, singIn, requireSignin};