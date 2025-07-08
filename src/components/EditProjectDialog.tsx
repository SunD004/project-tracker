"use client";
import React, { useEffect, useTransition, useState } from "react";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import {
  projectStatusList,
  projectSchema,
  type Project,
} from "@/types/project";
import { updateProjectAction } from "@/app/actions/updateProjectAction";
import { useRouter } from "next/navigation";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import z from "zod";

export function EditProjectDialog({ project, ...props }: { project: Project } & React.HTMLAttributes<HTMLButtonElement>) {
  const [open, setOpen] = useState(false);
  const [isPending, startTransition] = useTransition();
  const [error, setError] = useState<string | null>(null);
  const router = useRouter();

  const form = useForm({
    resolver: zodResolver(projectSchema),
    defaultValues: {
      name: project.name,
      description: project.description,
      status: project.status,
      budget: project.budget,
      startDate: project.startDate,
      endDate: project.endDate,
    },
  });

  useEffect(() => {
    form.reset(project);
  }, [project]);

  function handleStatusChange(value: (typeof projectStatusList)[number]) {
    form.setValue("status", value);
  }

  function handleSubmit(values: z.infer<typeof projectSchema>) {
    setError(null);
    startTransition(async () => {
      const res = await updateProjectAction({ id: project.id, ...values });
      if (res && "error" in res) {
        setError("Erreur lors de la modification du projet");
        return;
      }
      router.refresh();
      setOpen(false);
    });
  }

  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogTrigger asChild>
        <Button variant="outline" size="sm" {...props}>
          Modifier
        </Button>
      </DialogTrigger>
      <DialogContent>
        <DialogHeader>
          <DialogTitle>Modifier le projet</DialogTitle>
          <DialogDescription>
            Modifiez les informations du projet puis validez.
          </DialogDescription>
        </DialogHeader>
        <form onSubmit={form.handleSubmit(handleSubmit)} className="space-y-4">
          <div>
            <label className="block text-sm font-medium mb-1">Nom</label>
            <Input data-testid="edit-project-name" {...form.register("name")} required />
            {form.formState.errors.name && (
              <div className="text-red-600 text-sm">
                {form.formState.errors.name.message}
              </div>
            )}
          </div>
          <div>
            <label className="block text-sm font-medium mb-1">
              Description
            </label>
            <Textarea data-testid="edit-project-description" {...form.register("description")} required rows={2} />
            {form.formState.errors.description && (
              <div className="text-red-600 text-sm">
                {form.formState.errors.description.message}
              </div>
            )}
          </div>
          <div>
            <label className="block text-sm font-medium mb-1">Statut</label>
            <Select
              data-testid="edit-project-status"
              value={form.watch("status")}
              onValueChange={handleStatusChange}
            >
              <SelectTrigger>
                <SelectValue placeholder="Choisir un statut" />
              </SelectTrigger>
              <SelectContent>
                {projectStatusList.map((status) => (
                  <SelectItem key={status} value={status}>
                    {status}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
            {form.formState.errors.status && (
              <div className="text-red-600 text-sm">
                {form.formState.errors.status.message}
              </div>
            )}
          </div>
          <div>
            <label className="block text-sm font-medium mb-1">Budget (€)</label>
            <Input data-testid="edit-project-budget" type="number" min={0} {...form.register("budget", { valueAsNumber: true })} required />
            {form.formState.errors.budget && (
              <div className="text-red-600 text-sm">
                {form.formState.errors.budget.message}
              </div>
            )}
          </div>
          <div className="flex flex-col sm:flex-row gap-2">
            <div className="flex-1">
              <label className="block text-sm font-medium mb-1">Début</label>
              <Input data-testid="edit-project-startDate" type="date" {...form.register("startDate")} required />
              {form.formState.errors.startDate && (
                <div className="text-red-600 text-sm">
                  {form.formState.errors.startDate.message}
                </div>
              )}
            </div>
            <div className="flex-1">
              <label className="block text-sm font-medium mb-1">Fin</label>
              <Input data-testid="edit-project-endDate" type="date" {...form.register("endDate")} required />
              {form.formState.errors.endDate && (
                <div className="text-red-600 text-sm">
                  {form.formState.errors.endDate.message}
                </div>
              )}
            </div>
          </div>
          {error && <div className="text-red-600 text-sm">{error}</div>}
          <DialogFooter>
            <Button
              type="submit"
              disabled={isPending}
              className="w-full sm:w-auto"
              data-testid="edit-project-save"
            >
              Enregistrer
            </Button>
          </DialogFooter>
        </form>
      </DialogContent>
    </Dialog>
  );
}
