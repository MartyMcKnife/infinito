import admin from "firebase-admin";
import { CollectionReference, DocumentData } from "firebase/firestore";

//From: https://dev.to/digitalplayer1125/using-firebase-admin-with-nextjs-j6e
// This is so the backend can update the DB

try {
  admin.initializeApp({
    credential: admin.credential.cert(
      JSON.parse(process.env.FIREBASE_ADMIN as string)
    ),
  });
  console.log("Initialized.");
} catch (error: any) {
  if (!/already exists/u.test(error.message)) {
    console.error("Firebase admin initialization error", error.stack);
  }
}

export default admin;
export const db = admin.firestore();
