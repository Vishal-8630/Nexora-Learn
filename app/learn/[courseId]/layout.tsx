import { Sidebar } from "@/components/layout/Sidebar";
import { getCourse } from "@/lib/registry";
import { notFound } from "next/navigation";

interface LearnLayoutProps {
  children: React.ReactNode;
  params: any;
}

export default async function LearnLayout({ children, params }: LearnLayoutProps) {
  const { courseId } = await params;
  const course = getCourse(courseId);

  if (!course) {
    notFound();
  }

  return (
    <>
      <Sidebar courseId={courseId} />
      <div className="lg:ml-72">
        {children}
      </div>
    </>
  );
}
