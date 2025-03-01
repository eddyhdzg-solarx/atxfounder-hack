import { createClient } from "@/supabase/server";

export const getEvents = async () => {
  const supabase = await createClient();

  const { data, error } = await supabase.from("events").select("*");

  if (error) {
    throw error;
  }
  return data;
};
