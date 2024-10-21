import { deleteImage, getImageById } from "@/server/db/queries";
import { clerkClient } from "@clerk/nextjs/server";
import { Button } from "../ui/button";

export default async function FullImagePage({ id }: { id: number }) {
  const image = await getImageById(id);

  const uploaderInfo = await clerkClient.users.getUser(image.userId);

  return (
    <div className="flex h-full w-full min-w-0 justify-between gap-2">
      <div className="flex w-full flex-shrink items-center justify-center">
        <img src={image.url} alt={image.name} className="object-contain" />
      </div>
      <div className="flex min-w-64 max-w-64 flex-col border-l border-white">
        <div className="border-b p-2 text-center text-xl">{image.name}</div>

        <div className="flex flex-col p-2">
          <span>Uploaded By:</span>
          <span>{uploaderInfo.fullName}</span>
        </div>

        <div className="flex flex-col p-2">
          <span>Created On:</span>
          <span>{new Date(image.createdAt).toLocaleDateString()}</span>
        </div>

        <div className="p-2">
          <form
            action={async () => {
              "use server";
              await deleteImage(id);
            }}
          >
            <Button type="submit" variant="destructive">
              Delete
            </Button>
          </form>
        </div>
      </div>
    </div>
  );
}
