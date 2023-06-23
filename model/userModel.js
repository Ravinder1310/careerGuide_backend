const express = require("express");
const { Schema, model } = require("mongoose");

const userSchema = Schema({
    email:String,
    name:String,
    password:String,
    education:String,
    city:String,
    mobile:Number
})


const userModel = model("user",userSchema);

module.exports = {
    userModel
}