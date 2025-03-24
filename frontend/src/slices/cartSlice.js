import { createSlice } from "@reduxjs/toolkit";
import { updateCart } from "../utils/cartUtils";

const initialState = {
    cartItems: localStorage.getItem('cart')
        ? JSON.parse(localStorage.getItem('cart')).cartItems || []
    : [],itemsPrice: 0, shippingPrice: 0, gstPrice: 0, totalPrice: 0 }



const cartSlice = createSlice({
    name:"cart",
    initialState,
    reducers:{
        addToCart:(state,action)=>{
            const item=action.payload;
            console.log('checking item',item);
            
            const existItem=state.cartItems.find((x)=>x._id===item._id);
            if(existItem){
                state.cartItems=state.cartItems.map((x)=>x._id===existItem._id?item:x);
            }else{
                state.cartItems=[...state.cartItems,item];
            }
           
           return updateCart(state);
        },
        removeFromCart:(state,action)=>{
            //removing the id cart item from the cartItems array
            state.cartItems=state.cartItems.filter((x)=>x._id!==action.payload);
            return updateCart(state);
        },
    }
});


export const {addToCart,removeFromCart}=cartSlice.actions;
export default cartSlice.reducer;

