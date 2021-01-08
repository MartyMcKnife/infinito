import express, { Request, Response } from "express";
import morgan from "morgan";
import cors from "cors";
import photo from "./routes/photos";

//Intialize backend
const app = express();

//Setup middleware

app.use(morgan("combined"));
app.use(cors());
//Setup routes

app.use("/", photo);

//Export app
export default app;
