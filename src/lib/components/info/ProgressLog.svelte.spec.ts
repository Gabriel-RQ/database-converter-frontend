import { render, screen } from "@testing-library/svelte";
import { describe, it, expect } from "vitest";
import ProgressLog from "./ProgressLog.svelte";

describe("Componente: ProgressLog", () => {
  it("deve renderizar lista de logs corretamente", () => {
    const logs = ["Iniciando...", "Finalizado"];
    render(ProgressLog, { logs });

    expect(screen.getByText("Iniciando...")).toBeTruthy();
    expect(screen.getByText("Finalizado")).toBeTruthy();
  });

  it("não deve quebrar com lista vazia", () => {
    const { container } = render(ProgressLog, { logs: [] });
    expect(container.firstChild).toBeTruthy();
    expect(screen.queryByText("Iniciando...")).toBeNull();
  });
});
