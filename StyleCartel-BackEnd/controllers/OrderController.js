import orderModel from "../models/OrderModel.js";
import userModel from "../models/usermodel.js";
import Stripe from "stripe";
const currency = "USD";
const deliveryCharge = 10;
const stripe = new Stripe(process.env.STRIPE_SECRET_KEY);
const placeOrder = async (req, res) => {
  try {
    const { userId, items, amount, address } = req.body;
    // Validate input data
    if (!userId || !items || !amount || !address) {
      return res
        .status(400)
        .json({ success: false, message: "Invalid input data" });
    }
    const orderData = {
      userId,
      items,
      address,
      amount,
      paymentMethod: "COD",
      payment: false,
      date: Date.now(),
    };
    const newOrder = new orderModel(orderData);
    const savedOrder = await newOrder.save();
    if (!savedOrder) {
      return res
        .status(500)
        .json({ success: false, message: "Failed to create order" });
    }
    const updatedUser = await userModel.findByIdAndUpdate(
      userId,
      { cartData: {} },
      { new: true }
    );
    if (!updatedUser) {
      return res
        .status(404)
        .json({ success: false, message: "User  not found" });
    }
    res.json({ success: true, message: "Order placed successfully" });
  } catch (error) {
    console.error(error);
    res.status(500).json({ success: false, message: "Internal Server Error" });
  }
};

const placeOrderStripe = async (req, res) => {
  try {
    const { userId, items, amount, address } = req.body;
    const { origin } = req.headers;
    const orderData = {
      userId,
      items,
      address,
      amount,
      paymentMethod: "Stripe",
      payment: false,
      date: Date.now(),
    };
    const newOrder = new orderModel(orderData);
    const savedOrder = await newOrder.save();

    const line_items = items.map((item) => ({
      price_data: {
        currency: currency,
        product_data: {
          name: item.name,
        },
        unit_amount: item.price * 100,
      },
      quantity: item.quantity,
    }));
    line_items.push({
      price_data: {
        currency: currency,
        product_data: {
          name: "Delivery Charges",
        },
        unit_amount: deliveryCharge * 100,
      },
      quantity: 1,
    });
    const session = await stripe.checkout.sessions.create({
      success_url: `${origin}/verify?success=true&orderId=${newOrder._id}`,
      cancel_url: `${origin}/verify?success=false&orderId=${newOrder._id}`,
      line_items,
      mode: "payment",
    });
    res.json({ success: true, session_url: session.url });
  } catch (error) {
    console.error(error);
    res.json({ success: false, message: error.message });
  }
}
const verifyStripe=async (req, res) => {
  const { orderId ,success,userId} = req.body;
  try {
    if(success==="true"){
      await orderModel.findByIdAndUpdate(orderId, { payment: true });
      await userModel.findByIdAndUpdate(userId, { cartData: {} });
      res.json({ success: true, message: "Payment successful and order updated" });
    }else{
      await orderModel.findByIdAndDelete(orderId);
      res.json({ success: false, message: "Payment failed, order deleted" });
    }
  } catch (error) {
    console.error(error);
    res.json({ success: false, message: error.message });
  }
}
const placeOrderRazorpay = async (req, res) => {};

const allOrders = async (req, res) => {
  try {
    const orders = await orderModel.find({});
    res.json({ success: true, orders });
  } catch (error) {
    console.log(error);
    res.json({ success: false, message: error.message });
  }
};

const userOrders = async (req, res) => {
  try {
    const { userId } = req.body;
    const orders = await orderModel.find({ userId });
    res.json({ success: true, orders });
  } catch (error) {
    console.log(error);
    res.json({ success: false, message: error.message });
  }
};
const updatestatus = async (req, res) => {
  try {
    const { orderId, status } = req.body;
    await orderModel.findByIdAndUpdate(orderId, { status });
    res.json({ success: true, message: "Order status updated successfully" });
  } catch (error) {
    console.log(error);
    res.json({ success: false, message: error.message });
  }
};

export {
  placeOrder,
  placeOrderRazorpay,
  placeOrderStripe,
  allOrders,
  userOrders,
  updatestatus,
  verifyStripe
};
