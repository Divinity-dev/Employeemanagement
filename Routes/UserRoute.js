import express from "express"
import User from "../model/User.js"
import cryptojs from 'crypto-js'

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
        res.status(401).json(error)
    }
})

// Get all users

route.get("/employees", async(req, res)=>{
    try {
        const employees = await User.find()
        res.status(200).json(employees)
    } catch (error) {
        res.status(400).json(error)
    }
    
})

export default route