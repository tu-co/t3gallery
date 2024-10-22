import { db } from "@/server/db";
import { images } from "@/server/db/schema";
import { ratelimit } from "@/server/ratelimit";
import { auth, clerkClient } from "@clerk/nextjs/server";
import { createUploadthing, type FileRouter } from "uploadthing/next";
import { UploadThingError } from "uploadthing/server";

const f = createUploadthing();

const MAX_FILE_SIZE = "4MB";
const MAX_FILES_COUNT = 5;

// FileRouter for your app, can contain multiple FileRoutes
export const ourFileRouter = {
  // Define as many FileRoutes as you like, each with a unique routeSlug
  imageUploader: f({
    image: { maxFileSize: MAX_FILE_SIZE, maxFileCount: MAX_FILES_COUNT },
  })
    // Set permissions and file types for this FileRoute
    .middleware(async ({ req }) => {
      // This code runs on your server before upload
      const user = auth();

      // If you throw, the user will not be able to upload
      if (!user.userId) throw new UploadThingError("Unauthorized");

      // Only allow certain users to upload to this app with clerks help
      const fullUserData = await clerkClient.users.getUser(user.userId);
      if (fullUserData?.privateMetadata?.["can-upload"] !== true)
        throw new UploadThingError("User does not have upload permission");

      // Rate limit
      const { success } = await ratelimit.limit(user.userId);
      if (!success) throw new UploadThingError("Too many uploads");

      // Whatever is returned here is accessible in onUploadComplete as `metadata`
      return { userId: user.userId };
    })
    .onUploadComplete(async ({ metadata, file }) => {
      // This code RUNS ON YOUR SERVER after upload
      console.log("Upload complete for userId:", metadata.userId);

      await db.insert(images).values({
        name: file.name,
        url: file.url,
        userId: metadata.userId,
      });

      // !!! Whatever is returned here is sent to the clientside `onClientUploadComplete` callback
      return { uploadedBy: metadata.userId };
    }),
} satisfies FileRouter;

export type OurFileRouter = typeof ourFileRouter;
