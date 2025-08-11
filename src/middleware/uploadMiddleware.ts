import multer from "multer";
import { CloudinaryStorage } from "multer-storage-cloudinary";
import cloudinary from "../config/cloudinary";

const storage = new CloudinaryStorage({
  cloudinary,
  params: {
    folder: "creator-social",
    allowed_formats: ["jpg", "jpeg", "png", "mp4", "mov", "webm"],
  },
});

const upload = multer({ storage });

export default upload;
