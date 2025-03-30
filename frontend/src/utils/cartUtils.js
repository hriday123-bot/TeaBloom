export const addDecimal=(num)=>{
    return (Math.round(num*100)/100).toFixed(2);
}

export const updateCart=(state,action)=>{
     //calculate items price
     state.itemsPrice= addDecimal(state.cartItems.reduce((acc,item)=>acc+item.price*item.qty,0));
     //calculate shipping price
     state.shippingPrice=state.itemsPrice>500?addDecimal(0):addDecimal(100);
     //calculate tax price
     state.taxPrice=addDecimal(Number((0.15*state.itemsPrice).toFixed(2)));
     //calculate items price
     state.totalPrice=(Number(state.itemsPrice)+Number(state.shippingPrice)+Number(state.taxPrice)).toFixed(2);
     //strong in local storage
     localStorage.setItem('cart',JSON.stringify(state));
     return state;
}