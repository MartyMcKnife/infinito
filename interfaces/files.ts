export interface DropFile extends File {
  id: string;
  preview: string;
}

export interface Cloudinary {
  asset_id: string;
  public_id: string;
  version: number;
  version_id: string;
  signature: string;
  width: number;
  height: number;
  format: string;
  resource_type: string;
  created_at: Date;
  tags: any[];
  pages: number;
  bytes: number;
  type: string;
  etag: string;
  placeholder: boolean;
  url: string;
  secure_url: string;
  access_mode: string;
  original_filename: string;
  eager: Eager[];
}

export interface Eager {
  transformation: string;
  width: number;
  height: number;
  url: string;
  secure_url: string;
}
