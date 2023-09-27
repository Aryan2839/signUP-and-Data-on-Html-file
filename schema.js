import mongoose from "mongoose";

const userschema=mongoose.Schema(
    {
       username:{
        type:String,
        require:true
       },
       email:{
        type:String,
        require:true
       },
       password:{
        type:Number,
        require:true
       },
       confirmPassword:{
        type:Number,
        require:true
       },
       address:{
        type:String,
        require:true
       }
       
    },
    {
        timestamps:true,
       },
)

export const newUser= mongoose.model('User',userschema)