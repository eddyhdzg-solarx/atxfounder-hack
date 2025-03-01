"use server";

import { getEventData } from "./getEventData";
import { getMarkdown } from "./getMarkdown";

export async function scrapeEvent(url: string) {
  try {
    // Get the markdown content

    const markdownResult = await getMarkdown(url);

    if (!markdownResult.success || !markdownResult.data) {
      throw new Error("Failed to fetch markdown content");
    }

    // Extract event data
    const eventData = await getEventData(markdownResult.data);

    // Prepare event data object
    const eventDataToUpdate = {
      title: eventData.title,
      description: eventData.description,
      start: eventData.start,
      end: eventData.end,
      for_investors: eventData.for_investors,
      free_drinks: eventData.free_drinks,
      free_food: eventData.free_food,
      location_name: eventData.location_name,
      location_url: eventData.location_url,
      staff_pick: eventData.staff_pick,
      price: eventData.price,
      needs_badge: eventData.needs_badge,
      is_startup_event: eventData.is_startup_event,
      is_event_page: eventData.is_event_page,
    };

    return { success: true, data: eventDataToUpdate };
  } catch (error) {
    return {
      success: false,
      error: error instanceof Error ? error.message : "Unknown error occurred",
    };
  }
}
