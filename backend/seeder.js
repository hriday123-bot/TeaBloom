import mongoose from "mongoose";
import colors from "colors";
import dotenv from "dotenv";
import data from "./Data/data.js";
import users from "./Data/users.js";
import User from "./models/userModel.js";
import Data from "./models/dataModel.js";
import Order from "./models/orderModel.js";
import connectDB from "./config/db.js";

dotenv.config();

connectDB();

const importData = async () => {
    try{
        await Order.deleteMany();
        await Data.deleteMany();
        await User.deleteMany();

        const createdUsers=await User.insertMany(users);
        const adminUser=createdUsers[0]._id; 

        const sampleData=data.map((product)=>{
            return {...product,user:adminUser};
        });

        await Data.insertMany(sampleData);

        console.log("Data Imported!".green.inverse);
        process.exit();

    }catch(error){
        console.error(`Imported unsuccesful ${error}`.red.inverse);
        process.exit(1);
    }
}

const destroyData = async () => {
    try{
        await Order.deleteMany();
        await Data.deleteMany();
        await User.deleteMany();

        console.log("Data Destroyed!".red.inverse);
        process.exit();

    }catch(error){
        console.error(`Destroyed unsuccesful ${error}`.red.inverse);
        process.exit(1);
    }
}


if(process.argv[2]==='-d'){
    destroyData();
}else{
    importData();
}