import {v2 as cloudinary} from "cloudinary"
import fs from "fs"
import dotenv from "dotenv";



// Load environment variables from .env file

dotenv.config({ path: './.env' });



cloudinary.config({ 
  cloud_name: process.env.CLOUDINARY_CLOUD_NAME, 
  api_key: process.env.CLOUDINARY_API_KEY,
  api_secret: process.env.CLOUDINARY_API_SECRET 
});



const uploadOnCloudinary = async (localFilePath) => {
  try {
      if (!localFilePath) return null
      //upload the file on cloudinary
      const response = await cloudinary.uploader.upload(localFilePath, {
          resource_type: "auto"
      })
      // file has been uploaded successfull
      console.log("file is uploaded on cloudinary ", response.url);
      return response.secure_url; // Return only the URL

  } catch (error) {
      console.error("Cloudinary upload error:", error);
      fs.unlinkSync(localFilePath);
      return null;
  }
}



export  {uploadOnCloudinary}