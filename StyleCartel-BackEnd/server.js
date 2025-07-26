import express from 'express'
import cors from 'cors'

import 'dotenv/config'
import connectDB from './config/mongodb.js'
import connectCloundinary from './config/cloudinary.js'
import userRouter from './routes/userroute.js'
import productrouter from './routes/productroute.js'
import cartrouter from './routes/Cartroute.js'
import orderRouter from './routes/orderRoute.js'

import nodemailer from 'nodemailer'
import jwt from 'jsonwebtoken'
import UserModel from './models/usermodel.js'
import bcrypt from 'bcrypt'

//App config
const app = express()
const port = process.env.PORT || 4000
connectDB()
connectCloundinary()
//MIDDLEWARES
app.use(express.json())
app.use(cors())
app.use('/api/user',userRouter)
app.use('/api/product',productrouter)
app.use('/api/cart',cartrouter)
app.use('/api/order',orderRouter)
//api end points
app.get('/',(req,res)=>{
   res.send("API working")
})

app.listen(port,()=>console.log('server stated on PORT:' + port));
app.post('/forgot-password', (req, res) => {
    const {email} = req.body;
    UserModel.findOne({email: email})
    .then(user => {
        if(!user) {
            return res.send({Status: "User not existed"})
        } 
        const token = jwt.sign({id: user._id}, "jwt_secret_key", {expiresIn: "1d"})
        var transporter = nodemailer.createTransport({
            service: 'gmail',
            auth: {
              user: process.env.EMAIL, // Your Gmail address
              pass: process.env.EMAIL_PASSWORD // Your Gmail app password
            }
          });
          
          var mailOptions = {
            from: `"StyleCartel" <${process.env.EMAIL}>`,
            to: email,
            subject: 'Reset Password Link',
            text: `http://localhost:5173/reset-password/${user._id}/${token}`
          };
          
          transporter.sendMail(mailOptions, function(error, info){
            if (error) {
              console.log(error);
            } else {
              return res.send({Status: "Success"})
            }
          });
    })
    app.post('/reset-password/:id/:token', (req, res) => {
    const {id, token} = req.params
    const {password} = req.body

    jwt.verify(token, "jwt_secret_key", (err, decoded) => {
        if(err) {
            return res.json({Status: "Error with token"})
        } else {
            bcrypt.hash(password, 10)
            .then(hash => {
                UserModel.findByIdAndUpdate({_id: id}, {password: hash})
                .then(u => res.send({Status: "Success"}))
                .catch(err => res.send({Status: err}))
            })
            .catch(err => res.send({Status: err}))
        }
    })
})
})