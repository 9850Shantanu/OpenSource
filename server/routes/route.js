const express=require("express");
const router=express.Router();


const {signupUser,loginUser,addImage}=require("../controller/user-controller")
const {imageUpload}=require("../controller/imagecontroller");
const {createPost,getAllPosts,getPost,updatePost,deletePost}=require("../controller/postcontroller");
const {authToken}=require("../controller/jwtcontroller");

router.post("/signup",signupUser);
router.post("/login",loginUser);
router.post('/file/upload',imageUpload);



router.post("/createPost",createPost);


// get all posts


router.get("/getAllPosts",getAllPosts);


router.get("/details/:id",getPost);

router.post("/update/:id",updatePost);


router.delete("/delete/:id",deletePost)




module.exports=router;
