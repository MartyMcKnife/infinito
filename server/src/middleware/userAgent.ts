import { NextFunction, Request, Response } from "express";
import * as dotenv from "dotenv";

dotenv.config();

export const userAgent = (req: Request, res: Response, next: NextFunction) => {
  const ua = req.useragent.source;

  if (ua.includes(process.env.PASS)) {
    next();
  } else {
    res.status(401).send("Unauthorized");
  }
};
