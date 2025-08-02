import { Photo } from "../../types/photo";
import Grid from "../Grid/Grid";
import GridItem from "../GridItem/GridItem";
import PhotosGalleryItem from "../PhotosGalleryItem/PhotosGalleryItem";

interface PhotosGalleryProps {
  photos: Photo[];
}
export default function PhotosGallery({ photos }: PhotosGalleryProps) {
  return (
    <Grid>
      {photos.map((photo) => {
        return (
          <GridItem key={photo.id}>
            <PhotosGalleryItem photo={photo} />
          </GridItem>
        );
      })}
    </Grid>
  );
}
