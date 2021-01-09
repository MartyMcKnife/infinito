import { Router, Request, Response, NextFunction } from "express";
import bodyParser from "body-parser";
import * as dotenv from "dotenv";

dotenv.config();

import getRandom, {
  UnsplashError,
  UnsplashReturn,
} from "../helpers/unsplash/unsplash";

const router = Router();

router.use(bodyParser.urlencoded({ extended: true }));
router.use(bodyParser.json());

router.get(
  "/photos",
  async (req: Request, res: Response, next: NextFunction) => {
    type returns = UnsplashReturn[] | UnsplashError;
    const ua = req.useragent.source;
    if (ua.includes(process.env.PASS)) {
      try {
        let unsplash: returns = await getRandom(30);
        if ("message" in unsplash) {
          res.status(500).json(unsplash);
        } else {
          res.json(unsplash);
        }
      } catch (e) {
        res.status(500).json({
          status: 500,
          message: "Internal Server Error",
          reason: e.message,
        });
      }
    } else {
      res.status(401).json({ reason: "Unauthorized" });
    }
  }
);

router.post("/photos", async (req: Request, res: Response) => {
  console.log(req.body);
  res.json({ message: req.body.message });
});

export default router;
