import { v2 as cloudinary } from "cloudinary";

const conncectCloudinary = async () => {
  cloudinary.config({
    cloud_name: process.env.CLOUDINARY_CLOUD_NAME,
    api_key: process.env.CLOUDINARY_API_KEY,
    apicloud_secret: process.env.CLOUDINARY_API_SECRET_KEY,
  });

  console.log("Cloudinary connected successfully");
};

export default conncectCloudinary;
