import { getImageById } from "@/server/db/queries";

export default async function FullImagePage({ id }: { id: number }) {
  const image = await getImageById(id);
  return (
    <div className="flex h-full w-full min-w-0 justify-between gap-2">
      <div className="flex w-full flex-shrink items-center justify-center">
        <img src={image.url} alt={image.name} className="object-contain" />
      </div>
      <div className="flex min-w-64 max-w-64 flex-col border-l border-white">
        <div className="text-center text-xl font-bold">{image.name}</div>
      </div>
    </div>
  );
}
