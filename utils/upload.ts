import { DropFile } from "../interfaces/files";

//Given an array of objects, with the shape {id: string, preview: string}, remove the object with the given id
export function removeFile(files: DropFile[], id: string) {
  return files.filter((file) => file.id !== id);
}

//Convert a blob to a base64 string
export function blobToBase64(blob: Blob) {
  return new Promise<string>((resolve, reject) => {
    const reader = new FileReader();
    reader.onload = () => resolve(reader.result as string);
    reader.onerror = reject;
    reader.readAsDataURL(blob);
  });
}
