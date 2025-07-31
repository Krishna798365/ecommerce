import express from 'express'
import cors from 'cors'

import 'dotenv/config'
import connectDB from './config/mongodb.js'
import connectCloundinary from './config/cloudinary.js'
import userRouter from './routes/userroute.js'
import productrouter from './routes/productroute.js'
import cartrouter from './routes/Cartroute.js'
import orderRouter from './routes/orderRoute.js'
import productRouter from './routes/productfrontemd.js'
import nodemailer from 'nodemailer'
import jwt from 'jsonwebtoken'
import UserModel from './models/usermodel.js'
import bcrypt from 'bcrypt'
import cookieParser from 'cookie-parser'
//App config
const app = express()
const port = process.env.PORT || 4000
connectDB()
connectCloundinary()
//MIDDLEWARES

app.use(express.json())
app.use(cors())
app.use(cookieParser())

app.use('/api/user', userRouter);
app.use('/api/product', productrouter);
app.use('/api/cart', cartrouter);
app.use('/api/order', orderRouter);
app.use('/api/productfrontend', productRouter);

// ✅ Define custom routes BEFORE listen
app.post('/api/user/forgot-password', async (req, res) => {
  const { email } = req.body;
  try {
    const user = await UserModel.findOne({ email });
    if (!user) return res.send({ Status: "User not existed" });

    const token = jwt.sign({ id: user._id }, "jwt_secret_key", { expiresIn: "1d" });

    const transporter = nodemailer.createTransport({
      service: 'gmail',
      auth: {
        user: process.env.EMAIL,
        pass: process.env.EMAIL_PASSWORD
      }
      
    });
    console.log("ENV EMAIL:", process.env.EMAIL);
      console.log("ENV PASSWORD:", process.env.EMAIL_PASSWORD ? "✓ Present" : "✗ Missing");

    const mailOptions = {
      from: `"StyleCartel" <${process.env.EMAIL}>`,
      to: email,
      subject: 'Reset Password Link',
      text: `http://localhost:5173/reset-password/${user._id}/${token}`
    };

    transporter.sendMail(mailOptions, (error, info) => {
      if (error) {
        console.log("Email error: ", error);
        return res.status(500).send({ Status: "Failed to send email" });
      } else {
        console.log("Email sent: ", info.response);
        return res.send({ Status: "Success" });
      }
    });

  } catch (err) {
    console.error("Forgot password error:", err);
    res.status(500).send({ Status: "Server error" });
  }
});

app.post('/api/user/reset-password/:id/:token', async (req, res) => {
  const { id, token } = req.params;
  const { password } = req.body;

  try {
    jwt.verify(token, "jwt_secret_key");

    const hash = await bcrypt.hash(password, 10);
    await UserModel.findByIdAndUpdate({ _id: id }, { password: hash });
    res.send({ Status: "Success" });
  } catch (err) {
    console.error("Reset password error:", err);
    res.status(400).send({ Status: "Error with token" });
  }
});

// ✅ Start server at the end
app.listen(port, () => console.log('Server started on PORT:', port));
