import ProjectsTable from "@/components/ProjectsTable";
import prisma from "@/lib/prisma";

export default async function Home() {
  const projects = await prisma.project.findMany({ orderBy: { createdAt: "desc" } });
  return <ProjectsTable initialProjects={projects} />;
}
