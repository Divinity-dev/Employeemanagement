import mongoose from "mongoose";

const UserSchema = new mongoose.Schema({
    name:{type:String,  unique:true, required:true},
    email:{type:String, unique:true, required:true},
    position:{type:String, required:true},
    department:{type:String, required:true},
    salary:{type:Float32Array, required:true},
    dateofjoining : {type:Date},
    active:{type:Boolean, default:true},
    isadmin:{type:Boolean, default:false}
},
{
    timestamps:true
}) 