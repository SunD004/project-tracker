"use client";
import React, { useEffect } from "react";
import { useRouter } from "next/navigation";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
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

const stepSchema = projectSchema.pick({ name: true, description: true });
type StepData = z.infer<typeof stepSchema>;

export default function InfosPage() {
  const router = useRouter();
  const draft = useProjectFormStore((s) => s.draft);
  const setDraft = useProjectFormStore((s) => s.setDraft);
  const form = useForm<StepData>({
    resolver: zodResolver(stepSchema),
    defaultValues: { name: draft.name, description: draft.description },
  });

  useEffect(() => {
    form.reset({ name: draft.name, description: draft.description });
  }, [draft]);

  function onSubmit(values: StepData) {
    setDraft(values);
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
      <h1 className="text-2xl text-center font-bold mb-6">
        Créer un projet (1/3)
      </h1>

      <Form {...form}>
        <form
          onSubmit={form.handleSubmit(onSubmit)}
          className="space-y-6 max-w-lg w-full mx-auto"
        >
          <FormField
            control={form.control}
            name="name"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Nom du projet</FormLabel>
                <FormControl>
                  <Input {...field} autoFocus />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
          <FormField
            control={form.control}
            name="description"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Description</FormLabel>
                <FormControl>
                  <Textarea {...field} rows={3} />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
          <div className="flex justify-end pt-4">
            <Button type="submit">Suivant</Button>
          </div>
        </form>
      </Form>
    </main>
  );
}
