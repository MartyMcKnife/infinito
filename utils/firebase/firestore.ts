import { User } from "@firebase/auth";
import {
  collection,
  CollectionReference,
  DocumentData,
  setDoc,
  doc,
} from "@firebase/firestore";
import { db } from "./app";
import { User as IUser } from "../../interfaces/firestore";

const createCollection = <T = DocumentData>(collectionName: string) => {
  return collection(db, collectionName) as CollectionReference<T>;
};

export const userColl = createCollection<IUser>("users");

export const createUser = async (user: User, username: string) => {
  await setDoc(doc(db, "users", user.uid), {
    username,
    userID: user.uid,
    photos: [],
  });
};
