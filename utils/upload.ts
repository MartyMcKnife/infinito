import { arrayUnion } from "@firebase/firestore";
import { doc } from "@firebase/firestore";
import { updateDoc } from "@firebase/firestore";
import { Cloudinary, DropFile } from "../interfaces/files";
import axios from "axios";
import { db } from "./firebase/app";
import nsfwjs from "nsfwjs";
import * as tf from "@tensorflow/tfjs";

//Given an array of objects, with the shape {id: string, preview: string}, remove the object with the given id
export function removeFile(files: DropFile[], id: string) {
  return files.filter((file) => file.id !== id);
}

export const uploadFile = async (file: DropFile, userID: string) => {
  //Check if image contains nudity
  tf.enableProdMode();

  const model = await nsfwjs.load();
  const image = document.getElementById(file.id) as HTMLImageElement;
  const predictions = await model.classify(image);

  if (predictions[0].className !== "Neutral") {
    throw new Error("File is not safe for work");
  }
  //Upload to cloudinary
  const data = new FormData();
  data.append("file", file);
  data.append("upload_preset", "qa4futgg");

  const upload = (
    await axios.post<Cloudinary>(
      `https://api.cloudinary.com/v1_1/${process.env.NEXT_PUBLIC_CLOUDINARY_NAME}/upload`,
      data
    )
  ).data;

  //Add file to firestore
  await updateDoc(doc(db, "users", userID), {
    photos: arrayUnion({
      link: upload.url,
      id: file.id,
      name: file.name,
      width: upload.width,
      height: upload.height,
    }),
  });
};
