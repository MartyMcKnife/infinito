import e, { Router, Request, Response, NextFunction } from "express";
import bodyParser from "body-parser";

import { Photo } from "./../models/photo.model";

const router = Router();

router.use(bodyParser.urlencoded({ extended: true }));
router.use(bodyParser.json());

router.get("/user", async (req: Request, res: Response, next: NextFunction) => {
  try {
    let photos = await Photo.find({}, "photoAuthor");

    let userList = photos.map((photo) => {
      const user = photo.photoAuthor;
      return user;
    });
    userList = userList.filter((v, i, a) => a.indexOf(v) === i);
    res.json(userList);
  } catch (e) {
    next(e);
  }
});

router.get(
  "/user/:name",

  async (req: Request, res: Response, next: NextFunction) => {
    try {
      const photos = await Photo.find(
        { photoAuthor: req.params.name },
        "photoURL"
      );

      if (photos.length === 0) {
        res
          .status(400)
          .json({ message: "Couldn't find any photos for the given user" });
      } else {
        res.json({ number: photos.length, photos });
      }
    } catch (error) {
      res.status(503).json({
        message: "Something went wrong when searching for the user",
        error,
      });
    }
  }
);

export default router;
