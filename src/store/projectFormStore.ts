import { create } from "zustand";
import { persist } from "zustand/middleware";
import { z } from "zod";
import { projectSchema } from "@/types/project";

export type Project = z.infer<typeof projectSchema> & { id: string };
export type ProjectDraft = z.infer<typeof projectSchema>;

interface ProjectFormState {
  draft: ProjectDraft;
  setDraft: (data: Partial<ProjectDraft>) => void;
  resetDraft: () => void;
}

const defaultDraft: ProjectDraft = {
  name: "",
  description: "",
  status: "À faire",
  budget: 0,
  startDate: "",
  endDate: "",
};

export const useProjectFormStore = create<ProjectFormState>()(
  persist(
    (set) => ({
      draft: defaultDraft,
      setDraft: (data) =>
        set((state) => ({ draft: { ...state.draft, ...data } })),
      resetDraft: () => set({ draft: defaultDraft }),
    }),
    {
      name: "project-form-store",
      partialize: (state) => ({ draft: state.draft }),
    }
  )
);
