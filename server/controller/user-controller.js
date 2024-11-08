const mongoose=require("mongoose");
const User=require("../model/user");
const bcrypt=require("bcrypt");
const jwt=require("jsonwebtoken");
require("dotenv").config();
const token=require("../model/token");



exports.signupUser=async(req,res)=>
{
    try
    {
       const {name,username,password}=req.body;
      

      const hashedPassword=await bcrypt.hash(password,10);

       
       const newUser=await User.create({
        name:name,
        username:username,
        password:hashedPassword,
      
       });

      //  console.log(newUser);

       return res.status(200).json({
         message:"Sign Up Successful",
         success:true,
         data:newUser
       })



        
    }catch(err)
    {
           return res.status(500).json({
            success:false,
            message:"Sign up Unsuccessful"
           }) 
    }
}


exports.loginUser=async(req,res)=>
{
  try
  {
    const {username,password}=req.body;

    const user=await User.findOne({username:username});

    if(!user)
    {
      return res.status(400).json({
        success:false,
        message:"user not found"
      })
    }

    try
    {
      if(await bcrypt.compare(password,user.password))
      {

        const payload={
          username:user.username,
          password:user.password,
          _id:user._id
        }
        
        const accessToken=jwt.sign(payload,process.env.JWT_SECRET,{
          expiresIn:"15m"
        })

        
        const refreshToken=jwt.sign(payload,process.env.JWT_REFRESH)

        const newToken=await token.create({
           token:refreshToken
        })
        




        return res.status(200).json({
          accessToken:accessToken,
          refreshToken:refreshToken,
          success:true,
          user:user,
        })
      }
      else
      {
        return res.status(500).json({
          success:false,
          message:"password not matched"
        })
      }

    }catch(err)
    {
      return res.status(500).json({
        success:false,
        message:"Password not matched"
      })

    } 

  }catch(err)
  {
    return res.status(500).json({
       message:"Error while login"
    })
  }
}


