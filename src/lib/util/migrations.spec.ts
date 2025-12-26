import { describe, it, expect } from "vitest";
import {
  getMigrationStepMessage,
  parseMigrationStatusDescription,
  getSgbdDefaults,
} from "./migrations";

describe("util: migrations", () => {
  describe("getMigrationStepMessage", () => {
    it("deve retornar mensagem simples para status conhecidos", () => {
      const status: any = { step: "START" };
      expect(getMigrationStepMessage(status)).toBe("Iniciando migração...");
    });

    it("deve formatar mensagem de FINISHED com duração", () => {
      const start = new Date("2023-01-01T10:00:00").toISOString();
      const end = new Date("2023-01-01T10:01:05").toISOString();

      const status: any = {
        step: "FINISHED",
        startedAt: start,
        finishedAt: end,
        message: "Sucesso total",
      };

      const msg = getMigrationStepMessage(status);
      expect(msg).toContain("Migração finalizada em 01:05:000");
      expect(msg).toContain("Detalhes:\nSucesso total");
    });

    it("deve formatar mensagem de ERROR", () => {
      const status: any = { step: "ERROR", message: "Falha na conexão" };
      expect(getMigrationStepMessage(status)).toContain(
        "Erro no processo de migração"
      );
      expect(getMigrationStepMessage(status)).toContain("Falha na conexão");
    });
  });

  describe("parseMigrationStatusDescription", () => {
    it("deve mapear START para pending", () => {
      expect(parseMigrationStatusDescription("START")).toBe("pending");
    });

    it("deve mapear passos de progresso para processing", () => {
      expect(parseMigrationStatusDescription("EXTRACTION_IN_PROGRESS")).toBe(
        "processing"
      );
      expect(parseMigrationStatusDescription("LOAD_IN_PROGRESS")).toBe(
        "processing"
      );
    });

    it("deve mapear FINISHED para done", () => {
      expect(parseMigrationStatusDescription("FINISHED")).toBe("done");
    });

    it("deve mapear ERROR para error", () => {
      expect(parseMigrationStatusDescription("ERROR")).toBe("error");
    });
  });

  describe("getSgbdDefaults", () => {
    it("deve retornar defaults do Postgres", () => {
      const defs = getSgbdDefaults("POSTGRES");
      expect(defs.user).toBe("postgres");
      expect(defs.port).toBe(5432);
    });

    it("deve retornar defaults vazios para desconhecido", () => {
      const defs = getSgbdDefaults("MONGO");
      expect(defs.host).toBe("");
      expect(defs.port).toBeNull();
    });
  });
});
