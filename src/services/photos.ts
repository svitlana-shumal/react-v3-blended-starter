import axios from "axios";
import { Photo } from "../types/photo";

const TOKEN = import.meta.env.API_KEY;
axios.defaults.baseURL = "https://api.pexels.com/v1/";
axios.defaults.headers.common["Authorization"] = TOKEN;
axios.defaults.params = {
  orientation: "landscape",
};

export const getPhotos = async (query: string) => {
  const response = await axios.get(`search`, {
    params: { query },
  });

  return response.data.results;
  // const rawPhoto = response.data.photos;

  // const filterPhotos: Photo[] = rawPhoto.map((photo: any) => ({
  //   id: photo.id,
  //   avg_color: photo.avg_color,
  //   alt: photo.alt,
  //   src: {
  //     large: photo.src.large,
  //     original: photo.src.original,
  //   },
  // }));
  // return filterPhotos;
};
