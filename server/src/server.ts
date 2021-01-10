import app from "./index";
import mongoose from "mongoose";

const port = process.env.PORT || 5000;

//Setup mongo
const uri = process.env.MONGO_URL;

mongoose.connect(uri, {
  useNewUrlParser: true,
  useCreateIndex: true,
  useUnifiedTopology: true,
  useFindAndModify: false,
});

const connection = mongoose.connection;

connection.once("open", () => {
  console.log("Successfully connected to MongoDB");
});

app.listen(port, () => {
  console.log(`Server is listening at https://localhost:${port}`);
});
