import { Unsplash } from "../../interfaces/unsplash";
import type { NextApiRequest, NextApiResponse } from "next";
import axios from "axios";

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  const count = req.query.count || 30;
  try {
    const { data } = await axios.get<Unsplash[]>(
      "https://api.unsplash.com/photos/random",
      {
        params: {
          client_id: process.env.NEXT_PUBLIC_UNSPLASH_ACCESS,
          query: "nature", //TODO: Allow user to change this
          count,
        },
      }
    );
    //TODO: Add our own photos to response
    res.status(200).json(
      data.map((image) => {
        return {
          link: image.urls.small,
          width: image.width,
          height: image.height,
        };
      })
    );
  } catch (err: any) {
    res.status(500).json({ error: err.message });
  }
}
