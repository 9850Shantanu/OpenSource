const cloudinary=require('cloudinary').v2;

const Post=require("../model/post");

const User=require("../model/user");


exports.createPost=async(req,res)=>
{

    try
    {

        console.log(req.body);

        const existData=await User.findOne({username:req.body.username});

        if(!existData)
        {
            return res.status(404).json({
                success:false,

                message:"User not exist"
            })
        }
      
        const response=await Post.create({
            title:req.body.title,
            description:req.body.description,
            picture:req.body.picture,
            username:req.body.username,
            categories:req.body.categories

        })



        return res.status(200).json({
            success:true,
            message:"Post created SuccessfULLY"
        })




    }
    catch(err)
    {

        return res.status(404).json({
            success:false,
            err:err,

            message:"post not saved"
        })
        
    }
}


exports.getAllPosts=async(req,res)=>
{
    let category = req.query.category;
   
    try
    {
        let response;


        if(!category)
                response=await Post.find({});
        else
                response=await Post.find({category});

        console.log(response);
        return res.status(200).json({
            success:true,
            response
        })
    }
    catch(err)
    {
        return res.status(404).json({
            message:"Error while fetching data"
        })

    }
}


exports.getPost = async (req, res) => {
    try {
      const { id } = req.params;
      let response = await Post.findById(id);
  
      console.log(response);
      return res.status(200).json({
        success: true,
        response:response
      });
    } catch (err) {
      return res.status(404).json({
        message: 'Error while fetching post'
      });
    }
  };



  exports.updatePost=async(req,res)=>
  {
    const {id}=req.params;


    try
    {
     
        console.log(id);

        const post=await Post.findById(id);

        if(!post)
        {
            return res.status(404).json({
                success:false,
                message:"Post Not found"
            })
        }

        console.log("updating user ")

        const upadetdPost=await Post.findByIdAndUpdate(id,{
            title:req.body.title,
            description:req.body.description,
            picture:req.body.picture,
            username:req.body.username,
            categories:req.body.categories
        },{new:true});


        return res.status(200).json({
            success:true,

            message:"successfully updated",


        })



    }
    catch(err)
    {

        return res.status(404).json({
            message:"Not updates successfully",
            error:err

        })
    }
  }


  exports.deletePost=async(req,res)=>
  {
    const {id}=req.params;


    try
    {
     
        

       
        console.log("deleting user ")



        const del=await Post.findByIdAndDelete(id);

        console.log(del);


    


        return res.status(200).json({
            success:true,

            message:"successfully deleted",


        })



    }
    catch(err)
    {

        return res.status(404).json({
            message:"Not deleted successfully",
            error:err

        })
    }
  }
  