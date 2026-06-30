import { notFound } from "next/navigation";
import type { Metadata } from "next";
import { getAllCourseIds, getAllSlugs, getDocPageData, getCourse } from "@/lib/registry";
import { DocPage } from "@/components/docs/DocPage";

interface PageProps {
  params: Promise<{ courseId: string; slug: string[] }>;
}

// Generate all static paths at build time
export async function generateStaticParams() {
  const paths = [];
  const courseIds = getAllCourseIds();
  for (const courseId of courseIds) {
    const slugs = getAllSlugs(courseId);
    for (const slug of slugs) {
      paths.push({ courseId, slug });
    }
  }
  return paths;
}

// Generate per-page SEO metadata
export async function generateMetadata({ params }: PageProps): Promise<Metadata> {
  const { courseId, slug } = await params;
  const slugStr = slug.join("/");
  const data = getDocPageData(courseId, slugStr);
  const course = getCourse(courseId);

  if (!data || !course) {
    return { title: "Not Found" };
  }

  return {
    title: data.content.title,
    description: data.content.description,
    openGraph: {
      title: `${data.content.title} | ${course.title}`,
      description: data.content.description,
    },
  };
}

export default async function DocSlugPage({ params }: PageProps) {
  const { courseId, slug } = await params;
  const slugStr = slug.join("/");
  const data = getDocPageData(courseId, slugStr);

  if (!data) {
    notFound();
  }

  return (
    <div className="flex min-h-[calc(100vh-4rem)]">
      <DocPage data={data} />
    </div>
  );
}
