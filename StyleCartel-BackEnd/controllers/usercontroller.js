import userModel from "../models/usermodel.js";
import validator from "validator";
import bcrypt from "bcrypt";
import jwt  from "jsonwebtoken";
import { sendLoginEmail ,sendLoginEmail1} from "../middleware/mailer.js";
const getUserProfile = async (req, res) => {
  try {
   const {token} = req.headers;

    if (!token) {
      return res.status(401).json({ success: false, message: "No token provided" });
    }

    const decoded = jwt.verify(token, process.env.JWT_SECRET);
    const userId = decoded.id;

    const user = await userModel.findById(userId).select("-password");

    if (!user) {
      return res.status(404).json({ success: false, message: "User not found" });
    }

    res.json({ success: true, user });
  } catch (error) {
    console.error("Error fetching profile:", error);
    res.status(500).json({ success: false, message: error.message });
  }
};

const loginUser = async(req,res)=>{
    try {
        const {email,password} = req.body;
        const user = await userModel.findOne({email});
        if(!user){
            return res.status(400).json({success:false,message:"User does not exist"});
        }
        const isMatch = await bcrypt.compare(password,user.password);
        if(isMatch){
            const token = createtoken(user._id)
            res.json({success:true,token})
             await sendLoginEmail(user.email, user.name);
        }
        else{
            res.json({success:false,message:"Invalid Credentials"})
        }
    } catch (error) {
        console.log(error);
        res.json({success:false,message:error.message})
        
    }
}
const createtoken = (id)=>{
    return jwt.sign({id},process.env.JWT_SECRET);
}
const UserRegister = async(req,res)=>{
    try {
        const {name,email,password}=req.body;
        const exist = await userModel.findOne({email});
        if(exist){
         return res.json({success:false , message:"User already exists"});
        }
        if(!validator.isEmail(email)){
            return res.json({success:false , message:"Invalid email"});
        }
         if(password.length<8){
            return res.json({success:false , message:"Enter strong password"});

        }
        //hashing user password 
        const salt = await bcrypt.genSalt(10)
        const hashedPassword = await bcrypt.hash(password, salt);

        const newUser = new userModel({ 
            name,
            email,
            password:hashedPassword
        })
        const user = await newUser.save()
        const token = createtoken(user._id)
        res.json({success:true,token})
        await sendLoginEmail1(user.email, user.name);

    } catch (error) {
        console.log(error);
        res.json({success:false,message:error.message})
        
    }

}
const adminLogin = async(req,res)=>{
try {
    const {email,password}=req.body
    if(email === process.env.ADMIN_EMAIL && password ===process.env.ADMIN_PASSWORD){
        const token = jwt.sign(email+password,process.env.JWT_SECRET);
        res.json({success:true,token})
    }
    else{
        return res.json({success:false,message:"Invalid email or password"})
    }
} catch ( error) {
     console.log(error);
        res.json({success:false,message:error.message})
}
}

export  {loginUser,UserRegister,adminLogin, getUserProfile}; ;