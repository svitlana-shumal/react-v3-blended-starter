import { Photo } from "../../types/photo";
import Grid from "../Grid/Grid";
import GridItem from "../GridItem/GridItem";
import PhotosGalleryItem from "../PhotosGalleryItem/PhotosGalleryItem";

interface PhotosGalleryProps {
  photos: Photo[];
  onPhotoClick: (photo: Photo) => void;
}
export default function PhotosGallery({
  photos,
  onPhotoClick,
}: PhotosGalleryProps) {
  return (
    <Grid>
      {photos.map((photo) => {
        return (
          <GridItem key={photo.id}>
            <PhotosGalleryItem
              photo={photo}
              onPhotoClick={() => onPhotoClick(photo)}
            />
          </GridItem>
        );
      })}
    </Grid>
  );
}
