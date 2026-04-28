const CHARSET = "ABCDEFGHJKLMNPQRSTUVWXYZ23456789";

export function generateActivationToken(): string {
  const random = (n: number) =>
    Array.from(
      crypto.getRandomValues(new Uint8Array(n)),
      (b) => CHARSET[b % CHARSET.length]
    ).join("");
  return `FGMP-ACTIVATE-${random(6)}`;
}
