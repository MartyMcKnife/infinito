import { Router, Request, Response, NextFunction } from "express";
import bodyParser from "body-parser";
import multer from "multer";
import { body, check, validationResult } from "express-validator";

import { cloudinaryConfig, uploader } from "../helpers/cloudinary/cloudinary";
import getRandom from "../helpers/unsplash/unsplash";
import localRandom from "../helpers/mongodb/mongodb";

import { postResponse, returns, File } from "./photos.shape";

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
      let local = await localRandom(6);
      if ("message" in unsplash) {
        res.status(503).json(unsplash);
      } else {
        const returnArr = [...unsplash, ...local];
        res.status(200).json(returnArr);
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
    console.log(form.author[0]);
    console.log(form.author);
    console.log(form);

    const imageUrl = await Promise.all(
      images.map(async (image, index) => {
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
            photoAuthor: form.author[index],
            photoName: form.name[index],
          });

          await newPhoto.save();
          console.log("Photo successfully saved to database");
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
