import cloudinary from "cloudinary"
import dotenv from "dotenv";
dotenv.config();
// cloudinary.v2;
cloudinary.config({
  cloud_name: process.env.CLOUDINARYNAME,
  api_key: process.env.APIKEY,
  api_secret: process.env.APISECRET,
});
export const UploadToCloud = async (file,res)=>{
    try{
  const profilePicture = await cloudinary.uploader.upload(file.path, {
  folder: "image",
  use_filename: true,
});
return profilePicture;
    }catch(error){
return res.status(400).json({
      message:error
});
    }
};