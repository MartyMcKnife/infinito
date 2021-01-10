import mongoose from "mongoose";
const AutoIncrement = require("mongoose-sequence")(mongoose);

const Schema = mongoose.Schema;

const photos = new Schema({
  photoURL: { type: String, required: true },
  photoAuthor: { type: String, required: true },
  photoName: String,
});

photos.plugin(AutoIncrement, { inc_field: "id" });

export const Photo = mongoose.model("Photo", photos);
