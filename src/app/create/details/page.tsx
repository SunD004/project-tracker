"use client";
import React, { useEffect } from "react";
import { useRouter } from "next/navigation";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Form, FormField, FormItem, FormLabel, FormControl, FormMessage } from "@/components/ui/form";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { projectSchema, projectStatusList } from "@/types/project";
import { z } from "zod";
import { useProjectFormStore } from "@/store/projectFormStore";

const stepSchema = projectSchema.pick({ status: true, budget: true });
type StepData = z.infer<typeof stepSchema>;

export default function DetailsPage() {
  const router = useRouter();
  const draft = useProjectFormStore((s) => s.draft);
  const setDraft = useProjectFormStore((s) => s.setDraft);
  const form = useForm<StepData>({
    resolver: zodResolver(stepSchema),
    defaultValues: { status: draft.status, budget: draft.budget },
  });

  useEffect(() => {
    form.reset({ status: draft.status, budget: draft.budget });
  }, [draft]);

  function onSubmit(values: StepData) {
    setDraft(values);
    router.push("/create/dates");
  }
  function onBack() {
    setDraft(form.getValues());
    router.push("/create/infos");
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
      <h1 className="text-2xl text-center font-bold mb-6">Créer un projet (2/3)</h1>
      <Form {...form}>
        <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6 max-w-lg w-full mx-auto">
          <FormField
            control={form.control}
            name="status"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Statut</FormLabel>
                <FormControl>
                  <Select value={field.value} onValueChange={field.onChange}>
                    <SelectTrigger>
                      <SelectValue placeholder="Choisir un statut" />
                    </SelectTrigger>
                    <SelectContent>
                      {projectStatusList.map((status) => (
                        <SelectItem key={status} value={status}>{status}</SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
          <FormField
            control={form.control}
            name="budget"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Budget (€)</FormLabel>
                <FormControl>
                  <Input
                    type="number"
                    min={0}
                    step={1}
                    {...field}
                    onChange={(e) => {
                      const value = e.target.value;
                      field.onChange(value === "" ? "" : Number(value));
                    }}
                  />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
          <div className="flex justify-between pt-4">
            <Button type="button" variant="secondary" onClick={onBack}>Précédent</Button>
            <Button type="submit">Suivant</Button>
          </div>
        </form>
      </Form>
    </main>
  );
} 