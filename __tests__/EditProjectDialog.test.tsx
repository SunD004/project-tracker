import React from "react";
import { render, screen, fireEvent, waitFor } from "@testing-library/react";
import { EditProjectDialog } from "../src/components/EditProjectDialog";
import { type Project } from "@/types/project";

// Mock de l'action
jest.mock("@/app/actions/updateProjectAction", () => ({
  updateProjectAction: jest.fn().mockResolvedValue({ success: true }),
}));

// Mock de Prisma (si jamais utilisé dans le composant directement)
jest.mock("@/lib/prisma", () => ({
  __esModule: true,
  default: {
    project: {
      update: jest.fn(),
    },
  },
}));

jest.mock("next/navigation", () => ({
  useRouter: () => ({
    refresh: jest.fn(),
    push: jest.fn(),
    prefetch: jest.fn(),
    replace: jest.fn(),
    back: jest.fn(),
    forward: jest.fn(),
  }),
}));

const mockProject: Project = {
  id: "1",
  name: "Test Project",
  description: "Description de test",
  status: "À faire",
  budget: 1000,
  startDate: "2024-07-01",
  endDate: "2024-07-31",
};

describe("EditProjectDialog", () => {
  it("should render the edit project dialog fields", async () => {
    render(
      <EditProjectDialog
        project={mockProject}
        data-testid="edit-project-dialog-test"
      />
    );
    fireEvent.click(screen.getByTestId("edit-project-dialog-test"));
    expect(screen.getByTestId("edit-project-name")).toBeInTheDocument();
    expect(
      screen.getByText(/Modifiez les informations du projet puis validez./i)
    ).toBeInTheDocument();
    expect(screen.getByTestId("edit-project-save")).toBeInTheDocument();
  });
});
