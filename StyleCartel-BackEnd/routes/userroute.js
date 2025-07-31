import express from 'express';
import { loginUser, UserRegister, adminLogin, getUserProfile } from '../controllers/usercontroller.js';
import { OAuth2Client } from 'google-auth-library';
import jwt from 'jsonwebtoken';
import userModel from '../models/usermodel.js';

const client = new OAuth2Client(process.env.GOOGLE_CLIENT_ID); 
const userRouter = express.Router();

userRouter.get('/profile', getUserProfile); 
userRouter.post('/login', loginUser);
userRouter.post('/register', UserRegister);
userRouter.post('/admin', adminLogin);

// Google OAuth Login / Sign-Up Route
userRouter.post('/google-auth', async (req, res) => {
  const { token, mode } = req.body;

  if (!token) {
    return res.status(400).json({ success: false, message: 'Google token is missing' });
  }

  try {
    const ticket = await client.verifyIdToken({
      idToken: token,
      audience: process.env.GOOGLE_CLIENT_ID,
    });

    const payload = ticket.getPayload();
    const { email, name, sub } = payload;

    let user = await userModel.findOne({ email });

    // 🔐 Optional mode-based behavior
    if (mode === 'signup' && user) {
      return res.status(400).json({ success: false, message: 'User already exists. Please login.' });
    }

    if (mode === 'login' && !user) {
      return res.status(404).json({ success: false, message: 'User not found. Please sign up.' });
    }

    // If user doesn't exist → create (signup)
    if (!user) {
      user = new userModel({
        name,
        email,
        password: sub, // For Google users only; can be set to ''
        isGoogleUser: true,
      });
      await user.save();
    }

    // Generate JWT token
    const authToken = jwt.sign({ id: user._id }, process.env.JWT_SECRET, {
      expiresIn: '7d',
    });

    return res.json({ success: true, token: authToken });
  } catch (err) {
    console.error('Google Auth Error:', err.message);
    return res.status(401).json({ success: false, message: 'Invalid Google token' });
  }
});

export default userRouter;
