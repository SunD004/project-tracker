"use server";
import prisma from "@/lib/prisma";
import { Project } from "@/types/project";

export async function filterProjectsAction({
  name,
  description,
  status,
  budgetMin,
  budgetMax,
  startDate,
  endDate,
}: {
  name?: string;
  description?: string;
  status?: string;
  budgetMin?: number;
  budgetMax?: number;
  startDate?: string;
  endDate?: string;
}) {
  return prisma.project.findMany({
    where: {
      ...(name ? { name: { contains: name } } : {}),
      ...(description ? { description: { contains: description } } : {}),
      ...(status ? { status } : {}),
      ...(budgetMin !== undefined ? { budget: { gte: budgetMin } } : {}),
      ...(budgetMax !== undefined ? { budget: { lte: budgetMax } } : {}),
      ...(startDate ? { startDate: { gte: startDate } } : {}),
      ...(endDate ? { endDate: { lte: endDate } } : {}),
    },
    orderBy: { createdAt: "desc" },
  }) as unknown as Project[];
} 