// Inline stagger values for the entrance animations in globals.css:
// `--i` multiplies the base delay (90ms), `--d` adds a fixed offset.
import type { CSSProperties } from "react";

export function stagger(i: number, delayMs = 0): CSSProperties {
  return { "--i": i, "--d": `${delayMs}ms` } as CSSProperties;
}
