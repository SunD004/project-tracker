"use client";
import React, { useEffect, useState, useTransition } from "react";
import { useRouter } from "next/navigation";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import {
  Form,
  FormField,
  FormItem,
  FormLabel,
  FormControl,
  FormMessage,
} from "@/components/ui/form";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { projectSchema } from "@/types/project";
import { z } from "zod";
import { useProjectFormStore } from "@/store/projectFormStore";
import { createProjectAction } from "@/app/actions/createProjectAction";

const stepSchema = projectSchema.pick({ startDate: true, endDate: true });
type StepData = z.infer<typeof stepSchema>;

export default function DatesPage() {
  const router = useRouter();
  const draft = useProjectFormStore((s) => s.draft);
  const setDraft = useProjectFormStore((s) => s.setDraft);
  const resetDraft = useProjectFormStore((s) => s.resetDraft);
  const [error, setError] = useState<string | null>(null);
  const [isPending, startTransition] = useTransition();
  const form = useForm<StepData>({
    resolver: zodResolver(stepSchema),
    defaultValues: { startDate: draft.startDate, endDate: draft.endDate },
  });

  useEffect(() => {
    form.reset({ startDate: draft.startDate, endDate: draft.endDate });
  }, [draft]);

  async function onSubmit(values: StepData) {
    setDraft(values);
    const fullProject = { ...draft, ...values };
    setError(null);
    startTransition(async () => {
      const res = await createProjectAction(fullProject);
      if (res && "error" in res) {
        let msg = "Erreur lors de la création du projet.";
        if (res.error && typeof res.error === "object") {
          if (res.error.fieldErrors) {
            const allFieldErrors = Object.entries(res.error.fieldErrors)
              .filter(Boolean)
              .join(" ");
            if (allFieldErrors) {
              msg += " " + allFieldErrors;
            }
          }
        }
        setError(msg);
        return;
      }
      resetDraft();
      router.push("/");
      router.refresh();
    });
  }
  function onBack() {
    setDraft(form.getValues());
    router.push("/create/details");
  }

  return (
    <main className="container mx-auto py-8 px-2">
      <div className="flex justify-center sm:justify-start items-center mb-6">
        <Button
          variant="link"
          className="mr-2 px-2"
          onClick={() => router.push("/")}
        >
          Revenir à l'accueil
        </Button>
      </div>
      <h1 className="text-2xl text-center font-bold mb-6">Créer un projet (3/3)</h1>
      <Form {...form}>
        <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6 max-w-lg w-full mx-auto">
          <FormField
            control={form.control}
            name="startDate"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Date de début</FormLabel>
                <FormControl>
                  <Input type="date" {...field} />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
          <FormField
            control={form.control}
            name="endDate"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Date de fin</FormLabel>
                <FormControl>
                  <Input type="date" {...field} />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
          {error && <div className="text-red-600 text-sm">{error}</div>}
          <div className="flex justify-between pt-4">
            <Button
              type="button"
              variant="secondary"
              onClick={onBack}
              disabled={isPending}
            >
              Précédent
            </Button>
            <Button type="submit" disabled={isPending}>
              Créer le projet
            </Button>
          </div>
        </form>
      </Form>
    </main>
  );
}
