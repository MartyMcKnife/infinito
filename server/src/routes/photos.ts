import { Router, Request, Response, NextFunction } from "express";
import bodyParser from "body-parser";
import multer from "multer";

import { cloudinaryConfig, uploader } from "../helpers/cloudinary/cloudinary";
import getRandom from "../helpers/unsplash/unsplash";

import { postResponse, returns, File } from "./photos.model";

import { Photo } from "./../models/photo.model";

import { unsplashLimiter } from "./../middleware/rateLimiter";

const router = Router();

router.use(bodyParser.urlencoded({ extended: true }));
router.use(bodyParser.json());

router.use(unsplashLimiter);

const storage = multer.memoryStorage();
const upload = multer({
  storage,
});

router.get(
  "/photos",
  async (req: Request, res: Response, next: NextFunction) => {
    try {
      let unsplash: returns = await getRandom(30);
      if ("message" in unsplash) {
        res.status(503).json(unsplash);
      } else {
        res.json(unsplash);
      }
    } catch (e) {
      next(e);
    }
  }
);

router.post(
  "/photos",
  upload.array("image"),
  async (req: Request, res: Response, next: NextFunction) => {
    const form: postResponse = req.body;
    const images: File[] = [].concat(req.files);

    if (req.files.length == 0) {
      res.status(400).json({ message: "No images found" });
      return;
    }

    if (!req.body.name || !req.body.author) {
      res.status(400).json({ message: "Missing metadata" });
      return;
    }

    for (const image of images) {
      if (!image.originalname.match(/\.(jpg|jpeg|png|gif)$/)) {
        res.status(403).json({ message: "Files must be images" });
        return;
      }
    }

    cloudinaryConfig();

    const imageUrl = await Promise.all(
      images.map(async (image) => {
        try {
          const uri =
            "data:image/jpeg;base64," + image.buffer.toString("base64");
          console.log("Uploading to cloudinary");

          const upload = await uploader.upload(uri, {
            folder: "/infinito",
            invalidate: true,
            overwrite: true,
            public_id: image.originalname,
            unique_filename: false,
          });
          console.log(`Uploaded ${image.originalname}`);

          console.log("Saving photo to DB");
          //Write to MongoDB
          const newPhoto = new Photo({
            photoURL: upload.url,
            photoAuthor: form.author,
            photoName: form.name,
          });

          await newPhoto.save();
          console.log("Photo successfully saved to database");
          console.log(image.originalname);
          return image.originalname;
        } catch (e) {
          next(e);
        }
      })
    );

    res.json({ name: form.name, author: form.author, filesUploaded: imageUrl });
  }
);

export default router;
