import express from 'express';  
import {placeOrder,placeOrderRazorpay,placeOrderStripe,verifyStripe,allOrders,userOrders,updatestatus,cancelOrder} from '../controllers/OrderController.js'; 
import adminauth from '../middleware/adminauth.js'; 
import authuser from '../middleware/auth.js';
const orderRouter = express.Router();
orderRouter.post('/list', adminauth,allOrders);
orderRouter.post('/status', updatestatus);

orderRouter.post('/place',authuser, placeOrder);
orderRouter.post('/razorpay',authuser, placeOrderRazorpay);
orderRouter.post('/stripe',authuser, placeOrderStripe);
orderRouter.post('/userorders', authuser, userOrders);
orderRouter.post('/verifystripe', authuser,verifyStripe); 
orderRouter.post('/cancel', cancelOrder); // ✅ cancel route


export default orderRouter;