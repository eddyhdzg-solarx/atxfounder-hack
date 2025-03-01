import { createClient } from "@/supabase/server";
import { FindEventSchema } from "@/types/findEvents.types";
import { z } from "zod";

export const createFindEvent = async (
  event: z.infer<typeof FindEventSchema>
) => {
  // Validate the event data
  const validatedEvent = FindEventSchema.parse(event);

  const supabase = await createClient();

  const { data, error } = await supabase
    .from("events")
    .upsert([validatedEvent])
    .select()
    .single();

  if (error) {
    throw error;
  }

  return data;
};
