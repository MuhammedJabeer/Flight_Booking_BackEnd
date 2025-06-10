const users = require('../models/Users');
const bcrypt = require('bcrypt');
const jwt=require('jsonwebtoken');
const nodemailer=require('nodemailer')
const transporter=require('../connect/email')
const Otp=require('../models/Otp')







exports.register = async (req,res)=>{
    try{
        const existingUser = await users.findOne({email: req.body.email});
        if(existingUser){
            return res.status(400).json({message: "User already exists"});
        }
        const {username, email, password} =req.body;
        console.log("reqbody",req.body);
        const hashedPassword = await bcrypt.hash(password, 10);
        const newUser=new users({
            username,
            email,
            password:hashedPassword
        })
        await newUser.save();

        const otpcode=Math.floor(100000+Math.random()*900000).toString();
        const expiresAt=new Date(Date.now() + 5 * 60 * 1000)

        await Otp.create({
            user:newUser.id,
            otp:otpcode,
            expiresAt
        })



        await transporter.sendMail({
            from:process.env.EMAIL_USER,
            to:email,
            subject: "Your OTP Code",
            text: `Your OTP code is ${otpcode}. It will expire in 5 minutes.`,

        })

        return res.status(201).json({message: "User created successfully",user_id:newUser._id});
    }catch(err){
        console.error(err);
       return res.status(500).json({message: "Internal server error"});
    }
}



exports.otpverifcation=async(req,res)=>{
       try{
           const {user_id,otp}=req.body
           console.log("req",req.body)

           const OtpFind=await Otp.findOne({user:user_id}).sort({createdAt:-1})
           console.log("otpfind",OtpFind)

           if(!OtpFind ||  OtpFind.expiresAt < Date.now()){
             return res.status(401).json("Otp expaired")
           }

           if(OtpFind.otp!==otp){
             return res.status(404).json("invalid Otp")
           }

           await users.findByIdAndUpdate(user_id,{isVerified:true})

           await Otp.deleteMany({user_id})

            return res.status(201).json("verified successfully")
       }catch(error){
            console.log(error)
            res.status(500).json("internal server error")
       }
}





exports.login=async(req,res)=>{
       try{
             const{email,password}=req.body
             console.log("user attempt",req.body);
             const User=await users.findOne({email});
             console.log("user",User)
                if(!User){
                  return  res.status(404).json({message:"User not founded "})
                }
                if(!User.isVerified){
                    return res.status(401).json({message:"verify your email"})
                }

             const isMatch =await bcrypt.compare(password, User.password);
             console.log("match",isMatch)
             if (!isMatch){
                return res.status(401).json({message:"invalid password"})
             }   
             const token=jwt.sign({id:User._id,username:User.username,email:User.email,role:User.role},process.env.SECRET_KEY,{
                expiresIn:"1h",
             });
               console.log("token",token)
                // res.cookie("token",token,{httpOnly:true})
               return res.status(200).json({ id: User._id,token:token});
       }catch(error){
          return  res.status(500).json({message:"Internal server error"})
       }
}

exports.logout=(req,res)=>{
     res.clearCookie("token");
  return res.json({ message: "Logged out successfully" });
}

