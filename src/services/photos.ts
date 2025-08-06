import axios from "axios";
import { Photo } from "../types/photo";

const API_KEY = import.meta.env.VITE_API_KEY;

interface PexelsResponse {
  photos: Photo[];
}

export const getPhotos = async (query: string): Promise<Photo[]> => {
  const response = await axios.get<PexelsResponse>(
    "https://api.pexels.com/v1/search",
    {
      headers: {
        Authorization: API_KEY,
      },
      params: {
        query,
        orientation: "landscape",
      },
    }
  );

  return response.data.photos;
};
