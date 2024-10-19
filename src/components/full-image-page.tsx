import { getImageById } from "@/server/db/queries";

export default async function FullImagePage({ id }: { id: number }) {
  const image = await getImageById(id);
  return <img src={image.url} alt={image.name} className="w-96" />;
}
