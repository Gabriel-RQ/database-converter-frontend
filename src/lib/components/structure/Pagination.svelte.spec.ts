import { render, screen, cleanup } from "@testing-library/svelte";
import { describe, it, expect, afterEach } from "vitest";
import Pagination from "./Pagination.svelte";

afterEach(() => {
  cleanup();
});

describe("Componente: Pagination", () => {
  it("deve renderizar os números das páginas", () => {
    render(Pagination, { count: 50, perPage: 10, page: 1 });

    expect(screen.getByText("1")).toBeTruthy();
    expect(screen.getByText("2")).toBeTruthy();
    expect(screen.getByText("5")).toBeTruthy();
  });

  it("deve indicar a página atual", () => {
    render(Pagination, { count: 50, perPage: 10, page: 3 });
    expect(screen.getByText("3")).toBeTruthy();
  });
});
