export function parseMinuteString(milliseconds: number) {
  const min = Math.floor(milliseconds / (1_000 * 60));
  const sec = Math.floor((milliseconds % (1_000 * 60)) / 1000);
  const ms = milliseconds % 1000;

  const mm = String(min).padStart(2, "0");
  const ss = String(sec).padStart(2, "0");
  const SSS = String(ms).padStart(3, "0");

  return `${mm}:${ss}:${SSS}`;
}
