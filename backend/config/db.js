import mongoose from "mongoose";
const connectDb=async()=>{
    try{
        const conn=await mongoose.connect(process.env.MONGO_URL)
        console.log(`MongoDb connection succesful: ${conn.connection.port}`);
    }catch{
        console.error(`Mongodb conncection failed, Error: ${error.message}`);
        process.exit(1);
    }
}

export default connectDb;