import express from 'express';
import dotenv from 'dotenv';
dotenv.config();
import connectDB from './config/db.js';
import data from './Data/data.js';

const port=process.env.PORT || 5000;
connectDB();

const app = express();
app.get('/',(req,res)=>{
    res.send('Server is ready');
})

app.get('/api/data',(req,res)=>{
    res.send(data);
})

app.get('/api/data/:id',(req,res)=>{
    const product=data.find((p)=>p._id===Number(req.params.id));
    if(product){
        res.send(product);
    }
    else{
        res.status(404).send({message:'Product not found'});
    }
})

app.listen(port,()=>{
    console.log(`Server is running on http://localhost:${port}`);
})