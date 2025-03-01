import { ScrapedTable } from "@/components/ScrapedTable";
import { getEvents } from "@/server";

export default async function AI() {
  const events = await getEvents();
  const scrapedEvents = events.filter((event) => event.status === "scraped");
  const unscrapedEvents = events.filter((event) => event.status !== "scraped");

  return (
    <div className="grid grid-rows-[20px_1fr_20px] items-center justify-items-center min-h-screen p-8 pb-20 gap-16 sm:p-20 font-[family-name:var(--font-geist-sans)]">
      <main className="flex flex-col gap-8 row-start-2 items-center sm:items-start max-w-[100%] w-full">
        <h2 className="text-xl font-semibold">
          Scraped: {scrapedEvents.length} / {events.length}
          <br />
          Unscraped: {unscrapedEvents.length} / {events.length}
        </h2>
        <div className="flex flex-col gap-16 w-full">
          <ScrapedTable events={unscrapedEvents} />
          <ScrapedTable scraped events={scrapedEvents} />
        </div>
      </main>
    </div>
  );
}
