import { ScrapedTable } from "@/components/ScrapedTable";
import { StepList } from "@/components/StepList";
import { getEvents } from "@/server";
import { getEventData } from "@/server/getEventData";
import { getFindEvents } from "@/utils/getFindEvents";

export default async function Home() {
  const { marisaEvents, entreEvents, mergedEvents, findEvents } =
    await getFindEvents();
  const events = await getEvents();

  const eventData = await getEventData("https://lu.ma/s8x3q214/");

  return (
    <div className="grid grid-rows-[20px_1fr_20px] items-center justify-items-center min-h-screen p-8 pb-20 gap-16 sm:p-20 font-[family-name:var(--font-geist-sans)]">
      <main className="flex flex-col gap-8 row-start-2 items-center sm:items-start max-w-[100%] w-full">
        <StepList
          marisaEvents={marisaEvents.length}
          entreEvents={entreEvents.length}
          mergedEvents={mergedEvents.length}
          filteredEvents={findEvents.length}
          dbEvents={events.length}
        />
        <ScrapedTable events={events} />
        <pre>{JSON.stringify(eventData, null, 2)}</pre>
      </main>
    </div>
  );
}
