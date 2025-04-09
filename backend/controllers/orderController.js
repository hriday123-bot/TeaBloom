import asyncHandler from '../middleware/asyncHandler.js';
import Order from '../models/orderModel.js';

//@dec Create a new Order
//@route POST /api/orders
//@access Private

const addOrderItems=asyncHandler(async(req,res)=>{
    const {
        orderItems,
        shippingAddress,
        paymentMethod,
        itemsPrice,
        totalPrice,
        taxPrice,
        shippingPrice,
    }=req.body;

    if(orderItems && orderItems.length==0){
        res.status(400);
        throw new Error('No order items');
    }else{
         const order=new Order({
            orderItems:orderItems.map((x)=>({
                ...x,
                data:x._id,
                _id:undefined
            })),
            user:req.user._id,
            shippingAddress,
            paymentMethod,
            itemsPrice,
            totalPrice,
            taxPrice,
            shippingPrice,
            totalPrice
        });
        console.log('checking order',order);
        
        const createdOrder=await order.save();
        res.status(201).json(createdOrder);
    }
})

//@dec  Get logged in user orders
//@route GET /api/orders/myorders
//@access Private

const getMyOrders=asyncHandler(async(req,res)=>{
    const orders=await Order.find({user:req.user._id});
    res.status(200).json(orders);
})
//@dec  Get logged in user orders by Id
//@route GET /api/orders/:id
//@access Private

const getMyOrdersById=asyncHandler(async(req,res)=>{
    const order=await Order.findById(req.params.id).populate('user','name email');
    if(order){
        res.status(200).json(order);
    }else {
        res.status(404);
        throw new Error('Order not found'); 
    }
})

//@dec  Update order to paid
//@route PUT /api/orders/:id/pay
//@access Private

const updateOrderToPaid=asyncHandler(async(req,res)=>{
   const order=await Order.findById(req.params.id);
   if(order){
    order.isPaid=true;
    order.paidAt=Date.now();
    order.paymentResult={
        id:req.body.id,
        status:req.body.status,
        update_time:req.body.update_time,
        email_address:req.body.email_address
    }
    const updatedOrder=await order.save();
    res.status(200).json(updatedOrder);
   }
   else{
    res.status(404);
    throw new Error('Order not found');
   }
   console.log('checking order',order);
})

//@dec Update order to delivered
//@route PUT /api/orders/:id/deliver
//@access Private

const updateOrderToDelivered=asyncHandler(async(req,res)=>{
    res.send('Update order to delivered');
})

// @desc    Get all orders
// @route   GET /api/orders
// @access  Private/Admin
const getOrders = asyncHandler(async (req, res) => {
    res.send('Get all orders');
})

//desc Delete order

export {addOrderItems,getMyOrders,getMyOrdersById,updateOrderToPaid,updateOrderToDelivered,getOrders};

