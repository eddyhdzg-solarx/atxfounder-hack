"use server";

import { createFindEvent } from "@/server";
import { FindEvent } from "@/types";

export async function createEvents(events: FindEvent[]) {
  const promises = events.map((event) => createFindEvent(event));
  await Promise.all(promises);
}
