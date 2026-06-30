import { redirect } from "next/navigation";
import { getFirstSlug } from "@/lib/registry";

export default function HomePage() {
  const firstSlug = getFirstSlug("dynamics") || "introduction/what-is-dynamics-365";
  redirect(`/learn/dynamics/${firstSlug}`);
}
