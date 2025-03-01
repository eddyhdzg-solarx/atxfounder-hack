import { FindEvent } from "@/types";

function cleanUrl(url: string) {
  try {
    const urlObj = new URL(url);

    // Ensure pathname ends with a single slash
    let cleanPath = urlObj.pathname.replace(/\/+$/, "") + "/";

    return `${urlObj.origin}${cleanPath}`;
  } catch (e) {
    return url; // Return original if parsing fails
  }
}

export function filterDuplicates(events: FindEvent[]): FindEvent[] {
  // Filter out events with empty URLs and normalize remaining URLs
  const normalizedEvents = events
    .filter((event) => event.url && event.url.trim() !== "")
    .map((event) => ({
      ...event,
      url: cleanUrl(event.url),
    }));

  const seen = new Set<string>();

  return normalizedEvents.filter((event) => {
    if (seen.has(event.url)) return false;
    seen.add(event.url);
    return true;
  });
}
