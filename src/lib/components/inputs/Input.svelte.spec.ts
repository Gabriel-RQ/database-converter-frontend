import { render, screen } from "@testing-library/svelte";
import { describe, it, expect } from "vitest";
import Input from "./Input.svelte";

describe("Componente: Input", () => {
  it("deve renderizar com label e atributos corretos", () => {
    render(Input, { label: "Usuário", value: "", name: "username" });

    const inputElement = screen.getByLabelText("Usuário");
    expect(inputElement).toBeTruthy();
    expect(inputElement.getAttribute("name")).toBe("username");
  });

  it("deve renderizar placeholder", () => {
    render(Input, { value: "", placeholder: "Digite aqui" });
    expect(screen.getByPlaceholderText("Digite aqui")).toBeTruthy();
  });

  it("deve aplicar o tipo correto (password)", () => {
    render(Input, { label: "Senha", value: "", type: "password" });

    const inputElement = screen.getByLabelText("Senha");
    expect(inputElement.getAttribute("type")).toBe("password");
  });
});
