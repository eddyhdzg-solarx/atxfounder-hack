import { createClient } from "@/supabase/server";

export const getScrapedEvents = async () => {
  const supabase = await createClient();

  const { data, error } = await supabase
    .from("events")
    .select("*")
    .eq("status", "scraped")
    .order("find_date", { ascending: true });

  if (error) {
    throw error;
  }

  return data;
};
