import { describe, it, expect, vi } from "vitest";
import { startMigration, getStatus } from "./migrations";

vi.mock("$env/static/public", () => ({
  PUBLIC_API_URL: "http://api-test.com",
}));

describe("api: migrations", () => {
  const createMockFetch = (ok: boolean, data: any) => {
    return vi.fn().mockResolvedValue({
      ok,
      json: async () => data,
    });
  };

  describe("startMigration", () => {
    it("deve chamar a URL correta e retornar dados em caso de sucesso", async () => {
      const mockResponse = { id: "123", status: "PENDING" };
      const fetchMock = createMockFetch(true, mockResponse);
      const requestData: any = { name: "Teste Migração" };

      const result = await startMigration(fetchMock, requestData);

      expect(fetchMock).toHaveBeenCalledWith("http://api-test.com/migrations", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(requestData),
      });

      expect(result).toEqual(mockResponse);
    });

    it("deve lançar erro quando a API falhar", async () => {
      const errorResponse = { message: "Dados inválidos" };
      const fetchMock = createMockFetch(false, errorResponse);

      await expect(startMigration(fetchMock, {} as any)).rejects.toThrow(
        "Dados inválidos"
      );
    });
  });

  describe("getStatus", () => {
    it("deve fazer GET na URL correta", async () => {
      const mockResponse = { step: "FINISHED" };
      const fetchMock = createMockFetch(true, mockResponse);

      const result = await getStatus(fetchMock, "id-123");

      expect(fetchMock).toHaveBeenCalledWith(
        "http://api-test.com/migrations/id-123/status",
        {
          method: "GET",
        }
      );
      expect(result).toEqual(mockResponse);
    });
  });
});
