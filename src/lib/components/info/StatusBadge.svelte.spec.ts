import { render, screen } from "@testing-library/svelte";
import { describe, it, expect } from "vitest";
import StatusBadge from "./StatusBadge.svelte";

describe("Componente: StatusBadge", () => {
  it('deve mostrar "Pendente" para status "pending"', () => {
    render(StatusBadge, { status: "pending" });
    expect(screen.getByText("Pendente")).toBeTruthy();
  });

  it('deve mostrar "Executando" para status "processing"', () => {
    render(StatusBadge, { status: "processing" });
    expect(screen.getByText("Executando")).toBeTruthy();
  });

  it('deve mostrar "Erro" para status "error"', () => {
    render(StatusBadge, { status: "error" });
    expect(screen.getByText("Erro")).toBeTruthy();
  });

  it('deve mostrar "Finalizado" para status "done"', () => {
    render(StatusBadge, { status: "done" });
    expect(screen.getByText("Finalizado")).toBeTruthy();
  });
});
