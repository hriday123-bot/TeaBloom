import express from 'express';
import dotenv from 'dotenv';
dotenv.config();
import connectDB from './config/db.js';
import dataRoutes from './routes/dataRoutes.js';
import { notFound,errorHandler } from './middleware/errorMiddleware.js';

const port=process.env.PORT || 5000;
connectDB();

const app = express();
app.get('/',(req,res)=>{
    res.send('Server is ready');
})

app.use('/api/data',dataRoutes);

app.use(notFound);
app.use(errorHandler);

app.listen(port,()=>{
    console.log(`Server is running on http://localhost:${port}`);
})