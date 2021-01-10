import { Photo } from "./../../models/photo.model";
import photoShape, { PhotoReturn } from "./mongo.shape";

const localRandom = async (number: number): Promise<PhotoReturn[]> => {
  const randomPhotos = await Photo.aggregate().sample(number);
  const values = randomPhotos.map((photo) => {
    photo.photoAuthor;
    const { photoURL, photoAuthor, photoName } = photo;

    return { url: photoURL, author: photoAuthor, name: photoName };
  });
  return values;
};

export default localRandom;
