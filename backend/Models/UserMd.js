import mongoose from "mongoose";

const userSchema=new mongoose.Schema({
    fullName:{
        type:String,
    },
    email:{
        type:String,
        match:[/[^@ \t\r\n]+@[^@ \t\r\n]+\.[^@ \t\r\n]+/g,'Email id invalid'],
        required:[true,'Email is required'],
        unique:[true,'Email is already taken.']
    },
    password:{
        type:String,
        required:[true,'Password is required'],
    }

},{timestamps:true})

const User=mongoose.model('User',userSchema)
export default User