import { notFound } from "next/navigation";
import { SnackDetail } from "@/components/SnackDetail";
import { getSnackById } from "@/lib/data";

type Props = {
  params: { id: string };
};

export function generateMetadata({ params }: Props) {
  const snack = getSnackById(Number(params.id));
  return {
    title: snack ? `${snack.name} · 탕비실` : "간식 상세 · 탕비실",
  };
}

export default function SnackPage({ params }: Props) {
  const snack = getSnackById(Number(params.id));
  if (!snack) notFound();
  return <SnackDetail snack={snack} />;
}
