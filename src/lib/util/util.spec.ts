import { describe, it, expect } from "vitest";
import { parseMinuteString } from "./util";

describe("util: util", () => {
  describe("parseMinuteString", () => {
    it("deve formatar milissegundos corretamente (mm:ss:SSS)", () => {
      // 61500ms = 1 minuto, 1 segundo e 500ms
      const resultado = parseMinuteString(61500);
      expect(resultado).toBe("01:01:500");
    });

    it("deve formatar apenas segundos e milissegundos", () => {
      // 5500ms = 5 segundos e 500ms
      expect(parseMinuteString(5500)).toBe("00:05:500");
    });

    it("deve formatar apenas milissegundos", () => {
      // 123ms
      expect(parseMinuteString(123)).toBe("00:00:123");
    });

    it("deve lidar com valor zero", () => {
      expect(parseMinuteString(0)).toBe("00:00:000");
    });

    it("deve acumular minutos se o tempo for muito longo", () => {
      // 75 minutos = 4.500.000 ms
      // A função não calcula horas, então deve mostrar "75:00:000"
      expect(parseMinuteString(4_500_000)).toBe("75:00:000");
    });
  });
});
