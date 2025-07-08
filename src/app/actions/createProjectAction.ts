"use server";
import  prisma  from "@/lib/prisma";
import { projectSchema } from "@/types/project";
import { z } from "zod";

export async function createProjectAction(data: z.infer<typeof projectSchema>) {
  const parsed = projectSchema.safeParse(data);
  if (!parsed.success) {
    return { error: parsed.error.flatten() };
  }
  const project = await prisma.project.create({
    data: parsed.data,
  });
  return { project };
} 