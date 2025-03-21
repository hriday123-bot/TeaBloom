import mongoose from "mongoose";

const reviewSchema = mongoose.Schema({
    name: { type: String, required: true },
    rating: { type: Number, required: true },
    comment: { type: String, required: true },
},{timestamps:true});

const dataSchema = mongoose.Schema({
    user:{
        type: mongoose.Schema.Types.ObjectId,
        required: true,
        ref: "User",
    },
    name: { type: String, required: true },
    category: { type: String, required: true },
    price: { type: Number, required: true },
    description: { type: String, required: true },
    rating: { type: Number, required: true, default: 0 },
    inStock: { type: Boolean, required: true },
    origin: { type: String, required: true },
    image: { type: String, required: true },
    numberOfReviews: { type: Number, required: true ,default: 0},
    countInStock: { type: Number, required: true }, 
    reviews:[reviewSchema]
},{timestamps:true});

const Data = mongoose.model("Data", dataSchema);
export default Data;