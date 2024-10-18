import { db } from "@/server/db";

export const dynamic = "force-dynamic";

const mockUrls = [
  "https://utfs.io/f/QfvkUpnOvjFEEyhaC1SepS3DrczR6Fu2CZfXMxl7aoT1QGyg",
  "https://utfs.io/f/QfvkUpnOvjFEEyhaC1SepS3DrczR6Fu2CZfXMxl7aoT1QGyg",
  "https://utfs.io/f/QfvkUpnOvjFERkPavnKC5DkhAGK1Ne9OXy6wclgPf0uqSEvI",
  "https://utfs.io/f/QfvkUpnOvjFERkPavnKC5DkhAGK1Ne9OXy6wclgPf0uqSEvI",
];

const mockImages = mockUrls.map((url, index) => ({
  id: index + 1,
  url,
}));

export default async function HomePage() {
  const posts = await db.query.posts.findMany();

  console.log({ posts });

  return (
    <main className="">
      <div className="flex flex-wrap gap-4">
        {posts.map((post) => (
          <div key={post.id} className="w-48">
            <p>{post.name}</p>
          </div>
        ))}
        {mockImages.map((image) => (
          <div key={image.id} className="w-48">
            <img src={image.url} alt="image" />
          </div>
        ))}
      </div>
    </main>
  );
}
