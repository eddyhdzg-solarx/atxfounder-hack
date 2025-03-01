import { FindEvent } from "@/types";

/**
 * Normalizes a URL by removing query parameters and ensuring it ends with a slash
 */
function normalizeUrl(url: string): string {
  // Remove query parameters
  const urlWithoutParams = url.split("?")[0];

  // Ensure URL ends with slash
  return urlWithoutParams.endsWith("/")
    ? urlWithoutParams
    : `${urlWithoutParams}/`;
}

/**
 * Filters out duplicate events based on normalized URLs
 */
export function filterDuplicates(events: FindEvent[]): FindEvent[] {
  const seen = new Set<string>();

  return events.filter((event) => {
    const normalizedUrl = normalizeUrl(event.url);

    if (seen.has(normalizedUrl)) {
      return false;
    }

    seen.add(normalizedUrl);
    return true;
  });
}
