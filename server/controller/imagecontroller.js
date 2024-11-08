const cloudinary=require('cloudinary').v2;


function isFileTypeSupported(type, supportedTypes) {
    return supportedTypes.includes(type);
}

async function uploadFileToCloudinary(file, folder,quality) {
    const options = {folder};
    console.log("temp file path", file.tempFilePath);

  options.resource_type="auto"
  if(quality)
  {
    options.quality=quality;
  }
    
    return await cloudinary.uploader.upload(file.tempFilePath, options);
}

//image upload ka hadnler
exports.imageUpload = async (req, res) => {
    try{
        //data fetch
        // console.log("images");
        const { name,username} = req.body;
        // console.log(name,username);

        const file = req.files.file;
        // console.log(file);

        //Validation
        const supportedTypes = ["jpg", "jpeg", "png"];
        const fileType = file.name.split('.')[1].toLowerCase();
        // console.log("File Type:", fileType);

        if(!isFileTypeSupported(fileType, supportedTypes)) {
            return res.status(400).json({
                success:false,
                message:'File format not supported',
            })
        }

        //file format supported hai
        // console.log("Uploading to Codehelp");
        const response = await uploadFileToCloudinary(file, "vishwas");
        // console.log(response);


     

        return res.json({
            imageUrl:response.secure_url,
        })
    }
    catch(error) {
        console.error(error);
        res.status(400).json({
            success:false,
            message:'Something went wrong',
        });

    }
}
