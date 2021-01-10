export default interface PhotoShape {
  _id: string;
  photoURL: string;
  photoAuthor: string;
  photoName: string;
  id: number;
  __v: number;
}

export type PhotoReturn = {
  url: string;
  author: string;
  name: string;
};
