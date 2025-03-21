import asyncHandler from '../middleware/asyncHandler.js';
import Data from '../models/dataModel.js'


//@desc Fetch all data
//@route GET /api/data
//@access Public
const getData=asyncHandler(async(req,res)=>{
    const data=await Data.find({});
    res.send(data);
});

//@desc Fetch data by id
//@route GET /api/data/:id
//@access Public
const getDataById=asyncHandler(async(req,res)=>{
    const data=await Data.findById(req.params.id);
    if(data){
        res.send(data);
    }
    else{
        res.status(404);
        throw new Error('Data not found');
    }
})

export {getData,getDataById};