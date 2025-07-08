import { z } from "zod";

export const projectStatusList = ["À faire", "En cours", "Terminé"] as const;

export const projectSchema = z.object({
  name: z.string().min(2, "Le nom du projet est requis"),
  description: z.string().min(5, "La description est requise"),
  status: z.enum(projectStatusList, {
    errorMap: () => ({ message: "Statut invalide" })
  }),
  budget: z
    .number({ invalid_type_error: "Le budget doit être un nombre" })
    .min(0, "Le budget doit être positif"),
  startDate: z.string().min(1, "La date de début est requise"),
  endDate: z.string().min(1, "La date de fin est requise"),
});

export type Project = z.infer<typeof projectSchema> & { id: string }; 