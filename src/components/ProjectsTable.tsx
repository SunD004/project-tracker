"use client";
import { useEffect, useState, useTransition } from "react";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { Button } from "@/components/ui/button";
import { DeleteProjectDialog } from "@/components/DeleteProjectDialog";
import { EditProjectDialog } from "@/components/EditProjectDialog";
import {
  ProjectsFilterForm,
  ProjectFilters,
} from "@/components/ProjectsFilterForm";
import { filterProjectsAction } from "@/app/actions/filterProjectsAction";
import { Skeleton } from "./ui/skeleton";
import { type Project } from "@/types/project";

export default function ProjectsTable({
  initialProjects,
}: {
  initialProjects: Project[];
}) {
  const [projects, setProjects] = useState(initialProjects);
  const [isPending, startTransition] = useTransition();

  useEffect(() => {
    setProjects(initialProjects);
  }, [initialProjects]);

  async function handleFilter(filters: ProjectFilters) {
    startTransition(async () => {
      const filtered = await filterProjectsAction({
        ...filters,
        budgetMin: filters.budgetMin ? Number(filters.budgetMin) : undefined,
        budgetMax: filters.budgetMax ? Number(filters.budgetMax) : undefined,
      });
      setProjects(filtered);
    });
  }

  return (
    <main className="container mx-auto py-8 px-4 sm:px-0">
      <div className="flex justify-between items-center mb-6">
        <h1 className="text-2xl font-bold">Mes projets</h1>
        <Button asChild>
          <a href="/create/infos">Nouveau projet</a>
        </Button>
      </div>
      <ProjectsFilterForm onFilter={handleFilter} />
      <div className="relative overflow-x-auto rounded-md border bg-white">
        {isPending && (
          <div className="absolute inset-0 z-10 flex items-center justify-center bg-white/70">
            <Skeleton className="h-8 w-8 rounded-full mr-2" />
            <span className="text-gray-700">Chargement...</span>
          </div>
        )}
        <Table
          className={
            "min-w-[700px] md:min-w-0 " +
            (isPending ? "opacity-50 pointer-events-none" : "")
          }
        >
          <TableHeader>
            <TableRow>
              <TableHead className="text-xs px-2 py-1 md:text-sm md:px-4 md:py-2">
                Nom
              </TableHead>
              <TableHead className="text-xs px-2 py-1 md:text-sm md:px-4 md:py-2">
                Description
              </TableHead>
              <TableHead className="text-xs px-2 py-1 md:text-sm md:px-4 md:py-2">
                Statut
              </TableHead>
              <TableHead className="text-xs px-2 py-1 md:text-sm md:px-4 md:py-2">
                Budget
              </TableHead>
              <TableHead className="text-xs px-2 py-1 md:text-sm md:px-4 md:py-2">
                Début
              </TableHead>
              <TableHead className="text-xs px-2 py-1 md:text-sm md:px-4 md:py-2">
                Fin
              </TableHead>
              <TableHead className="text-xs px-2 py-1 md:text-sm md:px-4 md:py-2 text-right">
                Actions
              </TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {projects.length === 0 ? (
              <TableRow>
                <TableCell
                  colSpan={7}
                  className="text-center text-gray-500 text-xs md:text-sm"
                >
                  Aucun projet pour l'instant.
                </TableCell>
              </TableRow>
            ) : (
              projects.map((p) => (
                <TableRow key={p.id}>
                  <TableCell className="text-xs px-2 py-1 md:text-sm md:px-4 md:py-2">
                    {p.name}
                  </TableCell>
                  <TableCell className="text-xs px-2 py-1 md:text-sm md:px-4 md:py-2">
                    {p.description}
                  </TableCell>
                  <TableCell className="text-xs px-2 py-1 md:text-sm md:px-4 md:py-2">
                    {p.status}
                  </TableCell>
                  <TableCell className="text-xs px-2 py-1 md:text-sm md:px-4 md:py-2">
                    {p.budget} €
                  </TableCell>
                  <TableCell className="text-xs px-2 py-1 md:text-sm md:px-4 md:py-2">
                    {p.startDate}
                  </TableCell>
                  <TableCell className="text-xs px-2 py-1 md:text-sm md:px-4 md:py-2">
                    {p.endDate}
                  </TableCell>
                  <TableCell className="text-xs px-2 py-1 md:text-sm md:px-4 md:py-2 text-right">
                    <div className="flex gap-2 justify-end flex-wrap">
                      <EditProjectDialog project={p} />
                      <DeleteProjectDialog projectId={p.id} />
                    </div>
                  </TableCell>
                </TableRow>
              ))
            )}
          </TableBody>
        </Table>
      </div>
    </main>
  );
}
