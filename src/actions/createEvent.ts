"use server";

import { createFindEvent } from "@/server";
import { FindEvent } from "@/types";

export async function createEvent(event: FindEvent) {
  await createFindEvent(event);
}
