import { createClient } from "@/supabase/server";
import { DBEvent } from "@/types";

export const updateEvent = async (event: DBEvent) => {
  const supabase = await createClient();

  const { data, error } = await supabase
    .from("events")
    .update(event)
    .eq("id", event.id)
    .select()
    .single();

  if (error) {
    throw error;
  }

  return data;
};
