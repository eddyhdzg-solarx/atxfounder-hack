import { Database } from "./supabase.types";

export type DBEvent = Database["public"]["Tables"]["events"]["Row"];
