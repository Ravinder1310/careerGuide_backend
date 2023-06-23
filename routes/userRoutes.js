const express = require("express");
const { userModel } = require("../model/userModel");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
const userRouter = express.Router();

userRouter.get("/",async(req,res)=>{
   const data = await userModel.find();
   try {
    res.send(data);
   } catch (error) {
    res.send(error.message)
   }
})

userRouter.post("/addUser",async(req,res)=>{
    const {name,email,password} = req.body
    
    try {
        bcrypt.hash(password,5,async(err,hash)=>{
            if(err){
                res.send(err.message)
            }else{
                const user = new userModel({name,email,password:hash})
                await user.save();
                res.send("User has been registered");
            }
        })
        
    } catch (error) {
     res.send(error.message)
    }
 })

 userRouter.post("/userLogin",async(req,res)=>{
    const {email,password} = req.body
    
    try {   
        const user = await userModel.find({email})
        if(user.length>0){
            bcrypt.compare(password,user[0].password,(err,result)=>{
                if(result){
                    let token = jwt.sign({userID:user[0]._id},"car_deals")
                    res.send({"msg":"User logged in successfully", "token":token})
                }else{
                    res.send({"msg":"Something went wrong","err":err})
                }
            })
            
        }else{
            res.send("User not found");
        }
    } catch (error) {
     res.send(error.message)
    }
 })


 module.exports = {
    userRouter
 }

 