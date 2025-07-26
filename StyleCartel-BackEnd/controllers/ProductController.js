import productModel from '../models/productmoel.js';
import {v2 as cloudinary} from 'cloudinary';
import mongoose from 'mongoose'
//function for add product
const addproduct = async(req,res)=>{
   try {
    const {name,description,price,category,subcategory,sizes,bestseller}=req.body
    const image1=req.files.image1 && req.files.image1[0]
    const image2=req.files.image2 && req.files.image2[0]
    const image3=req.files.image3 && req.files.image3[0]
    const image4=req.files.image4 && req.files.image4[0]
    const images=[image1,image2,image3,image4].filter((item)=>item!==undefined)
    let imagesURL = await Promise.all(
        images.map(async(item)=>{
            let result = await cloudinary.uploader.upload(item.path,{resource_type:'image'});
            return result.secure_url;
        })
    )
    const productData = {
        name,
        description,
        price:Number(price),
        category,
        subcategory,
        sizes: JSON.parse(sizes),
        image:imagesURL,
        bestseller:bestseller==='true' ? true : false,
        date: Date.now()

    }
    console.log(productData);
    const product = new productModel(productData);
    await product.save();
    
    res.json({success:true,message:"Product ADDED"})
    
    

   } catch (error) {
    res.json({success:false,message:error.message});
   }
}
//function ofr list product
const listproduct = async(req,res)=>{
try {
    const products = await productModel.find({})
    res.json({success:true,products})

} catch (error) {
    res.json({success:false,message:error.message})
}
}
//function for delete product
const deleteproduct = async(req,res)=>{
 try {
    await productModel.findByIdAndDelete(req.body.id)
    res.json({success:true,message:"product removed"})
 } catch (error) {
    res.json({success:false,message:error.message})
 }
}
//function for single product info
const singleproduct = async(req,res)=>{
    try {
     const {productId} = req.body
     const product = await productModel.findById(productId)
     res.json({success:true,product})
    
    } catch (error) {
         res.json({success:false,message:error.message})
    }

}
export {listproduct,addproduct,deleteproduct,singleproduct}