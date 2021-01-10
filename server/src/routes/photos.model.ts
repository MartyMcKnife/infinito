import getRandom, {
  UnsplashError,
  UnsplashReturn,
} from "../helpers/unsplash/unsplash";

export type postResponse = {
  name: string;
  author: string;
};

export type returns = UnsplashReturn[] | UnsplashError;

export interface File {
  fieldname: string;
  originalname: string;
  encoding: string;
  mimetype: string;
  buffer: Buffer;
  size: number;
}
