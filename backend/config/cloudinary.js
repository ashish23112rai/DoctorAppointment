import { v2 as cloudinary } from 'cloudinary';

const connectCloudinary = () => {
  try {
    cloudinary.config({
      cloud_name: process.env.cloudinary_name,
      api_key: process.env.cloudinary_APIKey,
      api_secret: process.env.cloudinary_API_secretkey,
    });

    console.log("Cloudinary connected successfully");
  } catch (error) {
    console.error("Error connecting to Cloudinary:", error.message);
  }
};

export default connectCloudinary;
