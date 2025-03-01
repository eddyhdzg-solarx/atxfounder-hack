"use server";

export async function getMarkdown(url: string) {
  try {
    const eventData = await fetch(
      `https://atxfounder-hono.eddyhdzg.workers.dev/markdown?url=${url}`
    );
    const markdown = await eventData.text();
    return {
      success: true,
      data: markdown,
    };
  } catch (error) {
    return {
      success: false,
      data: null,
      error: error instanceof Error ? error.message : "Unknown error occurred",
    };
  }
}
