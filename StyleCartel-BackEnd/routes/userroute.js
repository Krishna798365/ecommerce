import express from  'express'
import { loginUser,UserRegister,adminLogin ,getUserProfile } from '../controllers/usercontroller.js'

const userRouter = express.Router();

userRouter.get('/profile',getUserProfile); 
userRouter.post('/login',loginUser);
userRouter.post('/register',UserRegister);
userRouter.post('/admin',adminLogin);

 export default userRouter;