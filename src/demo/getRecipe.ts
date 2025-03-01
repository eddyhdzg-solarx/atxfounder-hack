import { generateObject } from "ai";
import { createWorkersAI } from "workers-ai-provider";
import { z } from "zod";

type Env = {
  AI: Ai;
};

export async function getDemo(env: Env) {
  const workersai = createWorkersAI({ binding: env.AI });
  const result = await generateObject({
    model: workersai("@cf/meta/llama-3.1-8b-instruct"),
    prompt: "Generate a Lasagna recipe",
    schema: z.object({
      recipe: z.object({
        ingredients: z.array(z.string()),
        description: z.string(),
      }),
    }),
  });

  return result.object;
}
