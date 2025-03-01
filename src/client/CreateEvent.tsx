"use client";

import { createEvent } from "@/actions";
import { FindEvent } from "@/types";
import { Button } from "@/ui/button";

interface CreateEventProps {
  event: FindEvent;
}

export function CreateEvent({ event }: CreateEventProps) {
  return <Button onClick={() => createEvent(event)}>Create Event</Button>;
}
