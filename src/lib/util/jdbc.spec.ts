import { describe, it, expect } from "vitest";
import { getDriverClassName, getJdbcUrl } from "./jdbc";

describe("util: jdbc", () => {
  describe("getDriverClassName", () => {
    it("deve retornar o driver correto para POSTGRES", () => {
      expect(getDriverClassName("POSTGRES")).toBe("org.postgresql.Driver");
    });

    it("deve retornar o driver correto para FIREBIRD", () => {
      expect(getDriverClassName("FIREBIRD")).toBe(
        "org.firebirdsql.jdbc.FBDriver"
      );
    });

    it("deve lançar erro para SGBD desconhecido", () => {
      expect(() => getDriverClassName("MYSQL")).toThrow(
        "SGBD não suportado: MYSQL"
      );
    });
  });

  describe("getJdbcUrl", () => {
    it("deve gerar URL correta para POSTGRES com porta", () => {
      const url = getJdbcUrl("POSTGRES", "localhost", "5432", "database");
      expect(url).toBe("jdbc:postgresql://localhost:5432/database");
    });

    it("deve gerar URL correta para FIREBIRD sem porta (porta vazia)", () => {
      const url = getJdbcUrl("FIREBIRD", "192.168.0.1", "", "/path/to/db.fdb");
      expect(url).toBe("jdbc:firebirdsql://192.168.0.1//path/to/db.fdb");
    });

    it("deve lançar erro para SGBD desconhecido", () => {
      expect(() => getJdbcUrl("ORACLE", "localhost", "1521", "db")).toThrow(
        "SGBD não suportado: ORACLE"
      );
    });
  });
});
