import { EntreEvent, FindEvent } from "@/types";

/**
 * Parses an Entre event date and time string into an ISO date string, assuming CST timezone
 * @param dateStr Format: "March 11"
 * @param startTime Format: "4:00 PM"
 * @param endTime Format: "6:00 PM"
 * @returns ISO date string set to event start time in CST
 */
function parseEntreDateTime(dateStr: string, startTime: string | null): string {
  const year = 2025;
  const [month, day] = dateStr.split(" ");

  // Create date at start time
  const date = new Date(`${month} ${day}, ${year}`);

  if (!startTime) {
    // If no start time, set to midnight CST (6:00 UTC)
    date.setUTCHours(6, 0, 0, 0);
    return date.toISOString();
  }

  // Parse start time
  const [time, period] = startTime.split(" ");
  const [hours, minutes] = time.split(":").map(Number);

  // Convert to 24 hour format
  let hour24 = hours;
  if (period === "PM" && hours !== 12) hour24 += 12;
  if (period === "AM" && hours === 12) hour24 = 0;

  // Add 6 hours to convert CST to UTC
  date.setUTCHours(hour24 + 6, minutes, 0, 0);

  if (isNaN(date.getTime())) {
    throw new Error(`Invalid date/time format: ${dateStr} ${startTime}`);
  }

  return date.toISOString();
}

/**
 * Processes Entre events into the unified FindEvent format
 * Events are set to their start time in CST
 */
export function processEntreEvents(entreEvents: EntreEvent[]): FindEvent[] {
  const processed: FindEvent[] = [];

  for (const event of entreEvents) {
    const [title, url, , date, startTime] = event;
    try {
      processed.push({
        find_date: parseEntreDateTime(date, startTime),
        find_title: title,
        url: url,
      });
    } catch (error) {
      console.error(
        `Error parsing Entre event date/time: ${date} ${startTime}}`,
        error
      );
    }
  }

  return processed;
}
