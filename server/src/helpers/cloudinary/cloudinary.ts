import * as dotenv from "dotenv";

dotenv.config();

import cloudinary from "cloudinary";

const cloudinaryConfig = () =>
  cloudinary.v2.config({
    cloud_name: process.env.CLOUDINARY_NAME,
    api_key: process.env.CLOUDINARY_KEY,
    api_secret: process.env.CLOUDINARY_SECRET,
  });

const uploader = cloudinary.v2.uploader;

export { cloudinaryConfig, uploader };
