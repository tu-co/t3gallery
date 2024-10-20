import FullImagePage from "@/components/common/full-image-page";

export default function ImgByIdPage({
  params: { id },
}: {
  params: { id: string };
}) {
  const idAsNumber = Number(id);
  if (isNaN(idAsNumber)) throw new Error("Invalid image id");

  return <FullImagePage id={idAsNumber} />;
}
