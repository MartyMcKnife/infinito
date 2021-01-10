import express, { Request, Response } from "express";
import morgan from "morgan";
import cors from "cors";
import photo from "./routes/photos";
import user from "./routes/users";
import helmet from "helmet";
import useragent from "express-useragent";
import { generalLimiter } from "./middleware/rateLimiter";
import { userAgent } from "./middleware/userAgent";
import { errorHandler } from "./middleware/errorHandler";

//Intialize backend
const app = express();

//Setup middleware

app.use(morgan("combined"));
app.use(cors());
app.use(useragent.express());

if (process.env.NODE_ENV != "development") {
  app.use(helmet());
  app.use(generalLimiter);
}

app.use(errorHandler);
app.use(userAgent);
//Setup routes

app.use("/", photo);
app.use("/", user);

//Export app
export default app;
