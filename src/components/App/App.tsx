import { useEffect, useState } from "react";
import { Section } from "../Section/Section";
import Container from "../Container/Container";
import Form from "../Form/Form";
import { getPhotos } from "../../services/photos";
import { Photo } from "../../types/photo";
import toast, { Toaster } from "react-hot-toast";

export default function App() {
  const [photos, setPhotos] = useState<Photo[]>([]);

  useEffect(() => {
    const load = async () => {
      const data = await getPhotos("forest");
      setPhotos(data);
    };
    load();
  }, []);

  const handleSubmit = async (query: string) => {
    setPhotos([]);
    try {
      const fetchedPhotos = await getPhotos(query);
      if (fetchedPhotos.length === 0) {
        toast.error("No photos found for your request.");
        return;
      }
      setPhotos(fetchedPhotos);
    } catch {
      toast.error("Something went wrong. Please try again.");
    }
  };

  return (
    <>
      <Section>
        <Container>
          <Toaster position="top-right" />
          <Form onSubmit={handleSubmit} />
          <div>
            {photos.map((photo) => (
              <img key={photo.id} src={photo.src.large} alt={photo.alt} />
            ))}
          </div>
        </Container>
      </Section>
    </>
  );
}
