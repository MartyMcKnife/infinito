import { Unsplash } from "../../interfaces/unsplash";
import type { NextApiRequest, NextApiResponse } from "next";
import axios from "axios";
import { db } from "../../utils/firebase/admin";
import { User } from "../../interfaces/firestore";

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  // Get some photos from unsplash
  const count = parseInt((req.query.count as string) || "30", 10);
  try {
    const { data } = await axios.get<Unsplash[]>(
      "https://api.unsplash.com/photos/random",
      {
        params: {
          client_id: process.env.NEXT_PUBLIC_UNSPLASH_ACCESS,
          count,
        },
      }
    );

    const unsplashPhotos = data.map((photo) => {
      return {
        link: photo.urls.small,
        width: photo.width,
        height: photo.height,
        name: photo.description,
        id: photo.id,
        author: photo.user.username,
      };
    });

    //Retreive uploaded photos
    const users = (await db.collection("users").get()).docs.map(
      (user) => user.data() as User
    );

    //Extract all the photos
    const ourPhotos = users
      .map((user) =>
        user.photos.map((photo) => {
          return {
            link: photo.link,
            width: photo.width,
            height: photo.height,
            name: photo.name,
            id: photo.id,
            author: user.username,
          };
        })
      )
      .flat();

    //Combine all photos from the unsplash api and the firestore collection, only if the count is more than 20
    //Also randomize the order of the photos at the same time
    //Only add 15 of the firestore photos to the combination
    const photos =
      count > 20
        ? [
            ...unsplashPhotos,
            ...ourPhotos
              .sort(() => Math.random() - 0.5)
              .slice(0, Math.floor(Math.random() * 15)),
          ]
        : unsplashPhotos;

    res.status(200).json(photos);
  } catch (err: any) {
    console.error(err);
    res.status(500).json({ error: err.message });
  }
}
