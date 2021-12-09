import { arrayUnion } from "@firebase/firestore";
import { doc } from "@firebase/firestore";
import { updateDoc } from "@firebase/firestore";
import { Cloudinary, DropFile } from "../interfaces/files";
import axios from "axios";
import { db } from "./firebase/app";

//Given an array of objects, with the shape {id: string, preview: string}, remove the object with the given id
export function removeFile(files: DropFile[], id: string) {
  return files.filter((file) => file.id !== id);
}

export const uploadFile = async (file: DropFile, userID: string) => {
  const data = new FormData();
  data.append("file", file);
  data.append("upload_preset", "qa4futgg");

  const upload = (
    await axios.post<Cloudinary>(
      `https://api.cloudinary.com/v1_1/${process.env.NEXT_PUBLIC_CLOUDINARY_NAME}/upload`,
      data
    )
  ).data;

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
