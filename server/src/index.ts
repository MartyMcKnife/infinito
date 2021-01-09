import express, { Request, Response } from "express";
import morgan from "morgan";
import cors from "cors";
import photo from "./routes/photos";
import helmet from "helmet";
import useragent from "express-useragent";
import { limiter } from "./middleware/rateLimiter";

//Intialize backend
const app = express();

//Setup middleware

app.use(morgan("combined"));
app.use(cors());
app.use(useragent.express());

if (process.env.NODE_ENV != "development") {
  app.use(helmet());
  app.use(limiter);
}
//Setup routes

app.use("/", photo);

//Export app
export default app;
