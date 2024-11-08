const mongoose=require("mongoose");


const postSchema=new mongoose.Schema({
    title:{
        type:String,
        required:true,
        unique:true,
    },
    description:{
        type:String,
        required:true,
       
    },
    picture:{
        type:String,
        required:true,
       
    },
    username:{
        type:String,
        required:true,
       
    },
    categories:{
        type:String,
        required:true,
       
    },
    createdDate:{
        type:Date,
        default:Date.now()
    }
})


module.exports=mongoose.model("post",postSchema);