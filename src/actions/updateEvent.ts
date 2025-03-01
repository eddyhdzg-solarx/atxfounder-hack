"use server";

import { updateEvent } from "@/server";
import { DBEvent } from "@/types";

export async function updateEventAction(event: DBEvent) {
  await updateEvent(event);
}
