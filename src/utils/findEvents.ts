import { EntreEvent, MarisaEvent } from "@/types";
import { z } from "zod";
import { processEntreEvents } from "./parseEntre";
import { processMarisaEvents } from "./parseMarisa";

// Define the schema for the unified event format
export const FindEventSchema = z.object({
  find_date: z.string().nullable().optional(),
  find_title: z.string().nullable().optional(),
  url: z.string(),
});

export type FindEvent = z.infer<typeof FindEventSchema>;

/**
 * Merges and sorts events from different sources into a unified format
 */
export function findEvents(
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
