import express from 'express'
import  {getproduct}from '../controllers/Productfrontend.js'
const productRouter = express.Router();
productRouter.get('/gett',getproduct);

export default productRouter;