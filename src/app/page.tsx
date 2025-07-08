import ProjectsTable from "@/components/ProjectsTable";
import prisma from "@/lib/prisma";
import { type Project } from "@/types/project";

export default async function Home() {
  const projects = await prisma.project.findMany({
    orderBy: { createdAt: "desc" },
  });
  return <ProjectsTable initialProjects={projects as Project[]} />;
}
