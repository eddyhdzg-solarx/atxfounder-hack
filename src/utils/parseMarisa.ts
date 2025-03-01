import { MarisaEvent } from "@/types";
import { FindEvent } from "./findEvents";

/**
 * Parses a date and time string into an ISO date string, assuming CST timezone
 * @param dateStr The date string
 * @param timeStr Format: "HH:MM AM/PM CST"
 */
function parseMarisaDateTime(dateStr: string, timeStr: string): string {
  const [time, period] = timeStr.split(" ");
  const [hours, minutes] = time.split(":").map(Number);

  // Convert to 24 hour format
  let hour24 = hours;
  if (period === "PM" && hours !== 12) hour24 += 12;
  if (period === "AM" && hours === 12) hour24 = 0;

  const date = new Date(dateStr);
  // Add 6 hours to convert CST to UTC
  date.setUTCHours(hour24 + 6, minutes, 0, 0);

  if (isNaN(date.getTime())) {
    // If invalid, default to midnight CST (6:00 UTC)
    const fallbackDate = new Date(dateStr);
    fallbackDate.setUTCHours(6, 0, 0, 0);
    return fallbackDate.toISOString();
  }
  return date.toISOString();
}

/**
 * Processes Marisa's events into the unified FindEvent format
 */
export function processMarisaEvents(marisaEvents: MarisaEvent[]): FindEvent[] {
  const processed: FindEvent[] = [];

  for (const event of marisaEvents) {
    const [date, , startTime = "12:00 AM CST", , eventDetails] = event;
    try {
      processed.push({
        find_date: parseMarisaDateTime(date, startTime),
        find_title: eventDetails.text,
        url: eventDetails.url,
      });
    } catch (error) {
      console.error(
        `Error parsing Marisa event date/time: ${date} ${startTime}`,
        error
      );
    }
  }

  return processed;
}
