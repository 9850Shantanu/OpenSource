const mongoose=require("mongoose");
require("dotenv").config();



const Connection=async()=>
{
   await mongoose.connect(process.env.DATABASE_URL,{
        useNewUrlParser:true,
        useUnifiedTopology:true
    }).then(()=>
    {
        console.log("Database connection is successful");

    }).catch((err)=>
    {
        console.log("Database connection unsuccessful")
    })
}

module.exports=Connection;