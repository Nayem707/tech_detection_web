const URL_REGEX = /^(https?:\/\/)?([\w-]+(\.[\w-]+)+)([/?#][^\s]*)?$/i;

export function isLikelyUrl(input) {
  if (typeof input !== "string") return false;
  const trimmed = input.trim();
  if (!trimmed) return false;
  if (trimmed.length > 2048) return false;
  return URL_REGEX.test(trimmed);
}

export function normalizeInputUrl(input) {
  const trimmed = String(input).trim();
  if (!/^https?:\/\//i.test(trimmed)) return `https://${trimmed}`;
  return trimmed;
}
