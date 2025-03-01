import { createClient } from "@/supabase/server";

export const getEvents = async () => {
  const supabase = await createClient();

  const { data, error } = await supabase
    .from("events")
    .select("*")
    .order("find_date", { ascending: true });

  if (error) {
    throw error;
  }

  return data;
};
