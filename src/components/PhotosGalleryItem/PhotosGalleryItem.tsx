import { Photo } from "../../types/photo";
import GridItem from "../GridItem/GridItem";

import styles from "./PhotosGalleryItem.module.css";

interface PhotosGalleryItemPropr {
  photo: Photo;
}

export default function PhotosGalleryItem({ photo }: PhotosGalleryItemPropr) {
  return (
    <GridItem>
      <div
        className={styles.thumb}
        style={{
          backgroundColor: photo.avg_color,
          borderColor: photo.avg_color,
        }}
      >
        <img src={photo.src.original} alt={photo.alt} />
      </div>
    </GridItem>
  );
}
