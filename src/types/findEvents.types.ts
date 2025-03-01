import { z } from "zod";

// Define the schema for the unified event format
export const FindEventSchema = z.object({
  find_date: z.string().nullable().optional(),
  find_title: z.string().nullable().optional(),
  url: z.string(),
});

export type FindEvent = z.infer<typeof FindEventSchema>;
