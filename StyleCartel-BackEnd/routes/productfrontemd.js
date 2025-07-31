import express from 'express'
import  {getproduct}from '../controllers/Productfrontend.js'
const productRouter = express.Router();
productRouter.get('/get',getproduct);

export default productRouter;