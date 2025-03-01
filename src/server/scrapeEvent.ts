"use server";

import { getEventData } from "./getEventData";
import { getMarkdown } from "./getMarkdown";

export async function scrapeEvent(url: string) {
  try {
    // Get the markdown content

    console.log("url", url);
    const markdownResult = await getMarkdown(url);

    console.log("markdownResult", 1);
    if (!markdownResult.success || !markdownResult.data) {
      throw new Error("Failed to fetch markdown content");
    }
    console.log("markdownResult", 2);

    // Extract event data
    const eventData = await getEventData(markdownResult.data);

    console.log("eventData", eventData);

    // Convert price string to number or null
    const price = eventData.recipe.price
      ? parseFloat(eventData.recipe.price.replace(/[^0-9.]/g, ""))
      : null;

    // Prepare event data object
    const eventDataToUpdate = {
      title: eventData.recipe.title,
      description: eventData.recipe.description,
      start: eventData.recipe.start,
      end: eventData.recipe.end,
      for_investors: eventData.recipe.for_investors,
      free_drinks: eventData.recipe.free_drinks,
      free_food: eventData.recipe.free_food,
      location_name: eventData.recipe.location_name,
      location_url: eventData.recipe.location_url,
      staff_pick: eventData.recipe.staff_pick,
      price,
      needs_badge: eventData.recipe.needs_badge,
      is_startup_event: eventData.recipe.is_startup_event,
      is_event_page: eventData.recipe.is_event_page,
    };

    return { success: true, data: eventDataToUpdate };
  } catch (error) {
    return {
      success: false,
      error: error instanceof Error ? error.message : "Unknown error occurred",
    };
  }
}
