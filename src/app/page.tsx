import { getMyImages } from "@/server/db/queries";
import { SignedIn, SignedOut } from "@clerk/nextjs";
import Image from "next/image";

export const dynamic = "force-dynamic";

async function Images() {
  const images = await getMyImages();

  return (
    <div className="flex flex-wrap items-center gap-4 px-4">
      {images.map((image) => (
        <div key={image.id} className="flex w-48 flex-col items-center">
          <Image
            src={image.url}
            width={192}
            height={128}
            alt="image"
            className="h-32 w-48 object-cover"
          />
          <div className="w-full overflow-hidden truncate text-center">
            {image.name}
          </div>
        </div>
      ))}
    </div>
  );
}

export default function HomePage() {
  return (
    <main className="">
      <SignedOut>
        <div className="h-full w-full text-center text-2xl">
          Please sign in above
        </div>
      </SignedOut>
      <SignedIn>
        <Images />
      </SignedIn>
    </main>
  );
}
