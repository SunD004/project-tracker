"use client";
import { useState } from "react";
import { Button } from "@/components/ui/button";
import { projectStatusList } from "@/types/project";

export type ProjectFilters = {
  name: string;
  status: string;
  budgetMin: string;
  budgetMax: string;
  startDate: string;
  endDate: string;
  description: string;
};

const defaultFilters: ProjectFilters = {
  name: "",
  status: "",
  budgetMin: "",
  budgetMax: "",
  startDate: "",
  endDate: "",
  description: "",
};

export function ProjectsFilterForm({ onFilter }: { onFilter: (filters: ProjectFilters) => void }) {
  const [filters, setFilters] = useState(defaultFilters);

  function handleChange(e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) {
    setFilters({ ...filters, [e.target.name]: e.target.value });
  }
  function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    onFilter(filters);
  }
  function handleReset() {
    setFilters(defaultFilters);
    onFilter(defaultFilters);
  }

  return (
    <form onSubmit={handleSubmit} className="mb-6 flex flex-wrap gap-2 items-end">
      <input
        name="name"
        placeholder="Nom"
        value={filters.name}
        onChange={handleChange}
        className="border rounded px-2 py-1 text-sm"
      />
      <input
        name="description"
        placeholder="Description"
        value={filters.description}
        onChange={handleChange}
        className="border rounded px-2 py-1 text-sm"
      />
      <select
        name="status"
        value={filters.status}
        onChange={handleChange}
        className="border rounded px-2 py-1 text-sm"
      >
        <option value="">Statut</option>
        {projectStatusList.map((s) => (
          <option key={s} value={s}>{s}</option>
        ))}
      </select>
      <input
        name="budgetMin"
        type="number"
        min={0}
        placeholder="Budget min"
        value={filters.budgetMin}
        onChange={handleChange}
        className="border rounded px-2 py-1 text-sm w-28"
      />
      <input
        name="budgetMax"
        type="number"
        min={0}
        placeholder="Budget max"
        value={filters.budgetMax}
        onChange={handleChange}
        className="border rounded px-2 py-1 text-sm w-28"
      />
      <input
        name="startDate"
        type="date"
        value={filters.startDate}
        onChange={handleChange}
        className="border rounded px-2 py-1 text-sm"
      />
      <input
        name="endDate"
        type="date"
        value={filters.endDate}
        onChange={handleChange}
        className="border rounded px-2 py-1 text-sm"
      />
      <Button type="submit" size="sm">Filtrer</Button>
      <Button type="button" size="sm" variant="secondary" onClick={handleReset}>Réinitialiser</Button>
    </form>
  );
} 