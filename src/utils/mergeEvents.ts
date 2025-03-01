import { EntreEvent, FindEvent, MarisaEvent } from "@/types";
import { processEntreEvents } from "./parseEntre";
import { processMarisaEvents } from "./parseMarisa";

/**
 * Merges and sorts events from different sources into a unified format
 */
export function mergeEvents(
  marisaEvents: MarisaEvent[],
  entreEvents: EntreEvent[]
): FindEvent[] {
  const merged: FindEvent[] = [
    ...processMarisaEvents(marisaEvents),
    ...processEntreEvents(entreEvents),
  ];

  // Sort by date
  return merged.sort(
    (a, b) =>
      new Date(a.find_date || "").getTime() -
      new Date(b.find_date || "").getTime()
  );
}
