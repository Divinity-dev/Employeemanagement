import express from 'express';
import mongoose from 'mongoose';
import dotenv from 'dotenv';
import cors from 'cors';

dotenv.config()
// connect to DB

mongoose.connect(process.env.MONGO_URL).then(()=>{
    console.log("DB connected successfully")
}).catch((err)=>{
    console.log(err)
})
const app = express()
app.use(cors())
app.use(express.json())

app.get('/', (req, res) => {
    res.send('Backend is up and running!');
});


app.listen(process.env.port || 3000, ()=>{
    console.log(`server is running on ${process.env.port}`)
})