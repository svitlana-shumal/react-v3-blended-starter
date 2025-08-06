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
import Modal from "../Modal/Modal";

export default function App() {
  const [photos, setPhotos] = useState<Photo[]>([]);
  const [isEmpty, setIsEmpty] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [errorMessage, setErrorMessage] = useState("");
  const [selectedPhoto, setSelectedPhoto] = useState<Photo | null>(null);

  const onSubmit = async (query: string) => {
    setIsEmpty(false);
    setIsLoading(true);
    setErrorMessage("");
    try {
      const data = await getPhotos(query);
      if (!data.length) {
        toast.error(`We don\`t find photos with ${query}`);
        setIsEmpty(true);
        return;
      }
      setPhotos(data);
    } catch (error: unknown) {
      console.log(error);
      setErrorMessage("Oops! Someshing went wrong. Please try again.");
      toast.error("Failed to fetch photos. Check your API key or network.");
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
          {photos.length > 0 && (
            <PhotosGallery
              photos={photos}
              onPhotoClick={(photo) => setSelectedPhoto(photo)}
            />
          )}
          {selectedPhoto && (
            <Modal photo={selectedPhoto} onClose={() => setSelectedPhoto(null)}>
              <img
                src={selectedPhoto.src.large}
                alt={selectedPhoto.alt}
                style={{
                  maxWidth: "100%",
                  height: "auto",
                  objectFit: "contain",
                }}
                onClick={() => setSelectedPhoto(null)}
                role="button"
                tabIndex={0}
                onKeyDown={(e) => e.key === "Enter" && setSelectedPhoto(null)}
              />
            </Modal>
          )}
          {isEmpty && <Text textAlign="center">{errorMessage}</Text>}
          {isLoading && <Loader />}
        </Container>
      </Section>
    </>
  );
}
