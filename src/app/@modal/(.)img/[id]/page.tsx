import { getImageById } from "@/server/db/queries";

export default async function ImgModal({
  params: { id: photoId },
}: {
  params: { id: string };
}) {
  const idAsNumber = Number(photoId);
  if (isNaN(idAsNumber)) throw new Error("Invalid image id");

  const image = await getImageById(idAsNumber);
  return (
    <div className="h-64 w-96 overflow-hidden">
      <img
        src={image.url}
        alt={image.name}
        className="h-full w-full object-cover"
      />
    </div>
  );
}
