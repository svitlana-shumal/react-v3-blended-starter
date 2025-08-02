import { useState } from "react";
import Section from "../Section/Section";
import Container from "../Container/Container";
import Form from "../Form/Form";
import { getPhotos } from "../../services/photos";
import { Photo } from "../../types/photo";
import toast, { Toaster } from "react-hot-toast";
import Text from "../Text/Text";
import PhotosGallery from "../PhotosGallery/PhotosGallery";
import Loader from "../Loader/Loader";

export default function App() {
  const [photos, setPhotos] = useState<Photo[]>([]);
  const [isEmpty, setIsEmpty] = useState(false);
  const [isLoading, setIsLoading] = useState(false);

  const onSubmit = async (query: string) => {
    setIsEmpty(false);
    setIsLoading(true);
    try {
      const data = await getPhotos(query);
      if (!data.length) {
        toast.error(`We don\`t find photos with ${query}`);
        setIsEmpty(true);
        return;
      }
      setPhotos(data);
    } catch (error) {
      console.log(error);
    } finally {
      setIsLoading(false);
    }
  };
  return (
    <>
      <Section>
        <Container>
          <Toaster position="top-right" />
          <Form onSubmit={onSubmit} />
          {photos.length > 0 && <PhotosGallery photos={photos} />}
          {isEmpty && <Text textAlign="center">{"We don`t find photos"}</Text>}
          {isLoading && <Loader />}
        </Container>
      </Section>
    </>
  );
}
