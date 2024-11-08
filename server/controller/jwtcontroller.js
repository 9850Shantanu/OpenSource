const cloudinary=require('cloudinary').v2;
const jwt=require("jsonwebtoken")

require("dotenv").config();

exports.authToken = async (req, res,next) => {
    try
    {
        const Token=req.headers['Authorization'];
        const token=Token && Token.spilt(' ')[1];

        if(token==null)
        {
            return res.status(404).json({
                success:false,
                message:"Token Not found"
            })
        }

       const decode=jwt.verify(token,process.env.JWT_SECRET)
       if(decode)
       {
           return res.status(404).json({
            message:"Wrong access "
           })
       }
       console.log(decode);


       req.user=decode;
       next();


       
    }
    catch(err)
    {
    
    }

}
