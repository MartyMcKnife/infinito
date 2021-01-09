import * as dotenv from "dotenv";
import axios from "axios";
import Unsplash from "./unsplash.model";

dotenv.config();

export type UnsplashError = {
  message: string;
  reason: number;
};

export type UnsplashReturn = {
  url: string;
  author: string;
};

const getRandom = async (number: number) => {
  try {
    const unsplashURL = `https://api.unsplash.com/photos/random?count=${number}&query=travel,nature&client_id=${process.env.UNSPLASH_CLIENT}`;
    const data = await axios.get<Unsplash[]>(unsplashURL);
    const photos = data.data;

    const result: UnsplashReturn[] = photos.map((photo) => {
      return { url: photo.urls.full, author: photo.user.name };
    });
    return result;
  } catch (e) {
    if (e.response) {
      const error: UnsplashError = {
        message: "Unsplash erroed out",
        reason: e.response.status,
      };
      return error;
    }
  }
};

export default getRandom;
