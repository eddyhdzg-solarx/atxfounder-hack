import { CURRENT_YEAR } from "@/consts";
import { getCloudflareContext } from "@opennextjs/cloudflare";
import { generateObject } from "ai";
import { createWorkersAI } from "workers-ai-provider";
import { z } from "zod";

const schema = z.object({
  recipe: z.object({
    title: z.string().optional(),
    description: z.string().optional(),
    start: z.string().optional(),
    end: z.string().optional(),
    for_investors: z.boolean().optional(),
    free_drinks: z.boolean().optional(),
    free_food: z.boolean().optional(),
    location_name: z.string().optional(),
    location_url: z.string().optional(),
    staff_pick: z.boolean().optional(),
    price: z.string().optional(),
    needs_badge: z.boolean().optional(),
    is_startup_event: z.boolean().optional(),
    is_event_page: z.boolean().optional(),
  }),
});

export async function getEventData(data: string) {
  const system = `
You help extract data from a text file that contains event data.

Guidelines:
1. title: Name of the event, up to 10 words
2. description: Description of the event, concise, up to 10 words if a big company is hosting it put by the company name like by Google, by Meta, by Amazon, etc. Extract it from the content, and put it in a simply way if needed.
3. start: event start date/time in ISO format (assume ${CURRENT_YEAR} if year not specified), null if not specified
4. end: event end date/time in ISO format (assume ${CURRENT_YEAR} if year not specified), null if not specified
5. for_investors: Indicates whether the event is dedicated to investors.
6. free_drinks: The event explicitly says free drinks/alcohol will be provided, or it's clearly a free happy hour?
7. free_food: The event explecitly says free food/snacks will be provided?
8. location_name: Venue name, up to 5 words, avoid full address. If venue name is too long, use key descriptive words (e.g. "Austin Central Library" instead of "Austin Central Library, Austin Public Library"). If venue is not clear, use 'RSVP' or return null
9. location_url: Must be either a valid URL or null. If no URL is found in the markdown, return null. Usually found as a google maps link somewhere
10. staff_pick: Indicates whether the event is a top pick worthy of highlighting.
11. price: Price of the event, if not specified, return null
12. needs_badge: Indicates whether the event requires a badge to attend (e.g. SXSW badge, etc).
13. is_startup_event: Indicates whether the event is a startup event.
14. is_event_page: Indicates whether the url is actually an event page, maybe is not event an event page as it came from a webscraper.
`;

  const prompt = `Extracted data from this file: ${data}`;

  const { env } = getCloudflareContext();
  const workersai = createWorkersAI({ binding: env.AI });
  const result = await generateObject({
    model: workersai("@cf/meta/llama-3.1-8b-instruct"),
    system,
    prompt,
    schema,
  });

  return result.object;
}
