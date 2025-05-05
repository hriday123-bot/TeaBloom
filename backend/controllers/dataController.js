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
});


//@desc Create new data
//@route POST /api/data
//@access Private/Admin
const createData=asyncHandler(async(req,res)=>{
    const data=new Data({
        name:'Sample name',
        description:'Sample description',
        image:'/images/sample.jpg',
        origin:'Sample origin',
        category:'Sample category',
        price:0,
        countInStock:0,
        rating:0,
        numReviews:0,
        inStock:true,
        user:req.user._id,
    });

    const createdData=await data.save();
    res.status(201).json(createdData);
});

//@desc Update the data
//@route PUT /api/data/:id
//@access Private/Admin

const updateData=asyncHandler(async(req,res)=>{
    try {
        console.log('req.body',req.params);
        
        const {name,price,description,image,origin,category,countInStock,inStock}=req.body;
        const data=await Data.findById(req.params.id);
        if(data){
            data.name=name;
            data.price=price;
            data.description=description;
            data.image=image;
            data.origin=origin;
            data.category=category;
            data.countInStock=countInStock;
            data.inStock=inStock;
            data.user=req.user._id || data.user;
    
            const updatedData=await data.save();
            res.json(updatedData);
        }
    } catch (error) {
        console.log('Error:', error);
        res.status(404);
        throw new Error('Data not found');
    }
    
   
});


//@desc Delete the data
//@route Delete /api/data
//@access Private/Admin
const deleteData=asyncHandler(async(req,res)=>{
    try {
        const data=await Data.findById(req.params.id);
        if(data){
            await Data.deleteOne({_id:data._id});
            res.json({message:'Data removed'});
        }
        else{
            res.status(404);
            throw new Error('Data not found');
        }
        
    } catch (error) {
        console.log('Error in deleting the product', error);
    }
});


export {getData,getDataById,createData,updateData,deleteData};