import mongoose from "mongoose";

const UserSchema = new mongoose.Schema({
    name:{type:String,  unique:true, required:true},
    email:{type:String, unique:true, required:true},
    password:{type:String, required:true},
    position:{type:String, required:true},
    department:{type:String, required:true},
    salary:{type:Number, required:true},
    dateofjoining : {type:String, required:true},
    active:{type:Boolean, default:true},
    isadmin:{type:Boolean, default:false}
},
{
    timestamps:true
}) 
export default mongoose.model("User", UserSchema);