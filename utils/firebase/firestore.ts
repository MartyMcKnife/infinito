import { User } from "@firebase/auth";
import {
  collection,
  CollectionReference,
  DocumentData,
  setDoc,
  doc,
  getDoc,
} from "@firebase/firestore";
import { db } from "./app";
import { User as IUser } from "../../interfaces/firestore";

//Allow typescript stuff on returned DB documents

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

export const getUser = async (user: User) => {
  const document = await getDoc(doc(db, "users", user.uid));
  return document.data() as IUser;
};
