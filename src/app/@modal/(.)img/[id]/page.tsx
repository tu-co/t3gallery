import { getImageById } from "@/server/db/queries";
import { Modal } from "./modal";
import FullImagePage from "@/components/full-image-page";

export default async function ImgModal({
  params: { id: photoId },
}: {
  params: { id: string };
}) {
  const idAsNumber = Number(photoId);
  if (isNaN(idAsNumber)) throw new Error("Invalid image id");

  const image = await getImageById(idAsNumber);
  return (
    <Modal>
      <FullImagePage id={image.id} />
    </Modal>
  );
}
