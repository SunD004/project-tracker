"use server";
import prisma from "@/lib/prisma";
import { type Project, projectSchema } from "@/types/project";
import { revalidatePath } from "next/cache";

export async function updateProjectAction(data: Project) {
  const { id, ...rest } = data;
  const parsed = projectSchema.safeParse(rest);
  if (!parsed.success) {
    return { error: parsed.error.flatten() };
  }
  await prisma.project.update({ where: { id }, data: parsed.data });
  revalidatePath("/");
  return { success: true };
} 