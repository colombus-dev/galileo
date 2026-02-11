const DATA_URL_PREFIX = "data:";

function looksLikeUrlOrPath(value: string) {
  return (
    value.startsWith("http://") ||
    value.startsWith("https://") ||
    value.startsWith("/") ||
    value.startsWith("./") ||
    value.startsWith("../")
  );
}

function guessMimeTypeFromBase64(base64: string): string {
  const head = base64.slice(0, 32);

  // Common signatures when the base64 is the raw payload (no data: prefix)
  // SVG often starts with "<svg" => "PHN2Zy" in base64
  if (head.startsWith("PHN2Zy") || head.startsWith("PD94bWw")) return "image/svg+xml";
  if (head.startsWith("iVBORw0KGgo")) return "image/png";
  if (head.startsWith("/9j/")) return "image/jpeg";
  if (head.startsWith("R0lGOD")) return "image/gif";
  if (head.startsWith("UklGR")) return "image/webp";

  // Safe default that most callers expect
  return "image/png";
}

/**
 * Normalizes an image string to a valid <img src>.
 * - Accepts data URLs (returned as-is)
 * - Accepts regular URLs/paths (returned as-is)
 * - Accepts raw base64 payloads (wraps into a data URL)
 */
export function resolveImageSrc(value: string | undefined | null, mimeTypeHint?: string): string | undefined {
  if (!value) return undefined;
  const trimmed = value.trim();
  if (!trimmed) return undefined;

  if (trimmed.startsWith(DATA_URL_PREFIX)) return trimmed;
  if (looksLikeUrlOrPath(trimmed)) return trimmed;

  const mimeType = mimeTypeHint ?? guessMimeTypeFromBase64(trimmed);
  return `data:${mimeType};base64,${trimmed}`;
}
