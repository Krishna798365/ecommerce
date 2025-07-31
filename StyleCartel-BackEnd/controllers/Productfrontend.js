import productModel from '../models/productmoel.js';
import {v2 as cloudinary} from 'cloudinary';
import mongoose from 'mongoose'
const getproduct = async(req,res)=>{
try {
    const products = await productModel.find({})
    res.json({success:true,products})

} catch (error) {
    res.json({success:false,message:error.message})
}
}
export {getproduct};