import express from "express"
import User from "../model/User.js"
import cryptojs from 'crypto-js'
import jwt from "jsonwebtoken"

// declare the route variable
const route = express.Router()

// Create user

route.post("/employees", async(req, res)=>{
    const employee = new User({
        name:req.body.name,
        email: req.body.email,
        password: cryptojs.AES.encrypt(req.body.password, process.env.crypto_key).toString(),
        position:req.body.position,
        department: req.body.department,
        salary: req.body.salary,
        dateofjoining: req.body.dateofjoining,
    })
    try {
        const SaveDemployee = await employee.save()
        res.status(201).json(SaveDemployee)
    } catch (error) {
        console.log(error)
        res.status(401).json(error)
    }
})

// Get all employees

route.get("/employees", async(req, res)=>{
    try {
        const employees = await User.find().limit(20)
        res.status(200).json(employees)
    } catch (error) {
        console.log(error)
        res.status(400).json(error)
    }
    
})

// Get user by id
route.get("/employee/:id", async(req, res)=>{
    try {
        const employee = await User.findById(req.params.id)
        res.status(200).json(employee)
    } catch (error) {
        console.log(error)
        res.status(400).json(error)
    }
})

// delete
route.delete("/delete/:id", async(req, res)=>{
    try {
        await User.findByIdAndDelete(req.params.id)
        res.status(201).json('Employee deleted successfully')
    } catch (error) {
        console.log(error)
        res.status(401).json(error)
    }
})

// update

route.put("/employees/:id", async(req, res)=>{
    if(req.body.password){
        req.body.password = CryptoJS.AES.encrypt(req.body.password, process.env.crypto_key).toString()
       }
    try {
        const updatedEmployee = await User.findByIdAndUpdate(req.params.id, {
            $set:req.body
        }, {new:true})
        res.status(201).json(updatedEmployee)
    } catch (error) {
        console.log(error)
        res.status(401).json(error)
    }
})

// Login
route.post("/employee/login", async(req, res)=>{
    try {
        const employee = await User.findOne({name:req.body.name})
    if(!employee){
        res.status(401).json("employee not found")
    }
    const decryptedPassword = cryptojs.AES.decrypt(employee.password, process.env.crypto_key).toString(cryptojs.enc.Utf8);
    if(decryptedPassword=== req.body.password){
        const accessToken = jwt.sign({
            isadmin:employee.isadmin
        },
         process.env.jwtToken,
    {"expiresIn":"100D"})
    res.status(201).json({employee, accessToken})
    }else{
        res.status(401).json("Incorrect password")
    }

    } catch (error) {
        console.log(error)
        res.status(401).json(error)
    }
    
})

export default route