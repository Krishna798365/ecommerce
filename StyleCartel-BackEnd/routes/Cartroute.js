import express from 'express';
import { addtoCart,getusercart,updatecart } from '../controllers/cartconroller.js';
import authuser from '../middleware/auth.js';
const cartrouter = express.Router()

cartrouter.post('/get',authuser,getusercart)
cartrouter.post('/add',authuser,addtoCart)
cartrouter.post('/update',authuser,updatecart)

export default cartrouter