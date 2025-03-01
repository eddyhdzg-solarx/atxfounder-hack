"use client";

import { createEvents } from "@/actions/createEvents";
import { FindEvent } from "@/types";
import { Button } from "@/ui/button";

interface CreateEventProps {
  events: FindEvent[];
}

export function CreateEvents({ events }: CreateEventProps) {
  return <Button onClick={() => createEvents(events)}>Create Events</Button>;
}
