import { FindList } from "@/components/FindList";
import { StepList } from "@/components/StepList";
import { getFindEvents } from "@/utils/getFindEvents";

export default async function Home() {
  const { marisaEvents, entreEvents, mergedEvents, findEvents } =
    await getFindEvents();

  return (
    <div className="grid grid-rows-[20px_1fr_20px] items-center justify-items-center min-h-screen p-8 pb-20 gap-16 sm:p-20 font-[family-name:var(--font-geist-sans)]">
      <main className="flex flex-col gap-8 row-start-2 items-center sm:items-start">
        <StepList
          marisaEvents={marisaEvents.length}
          entreEvents={entreEvents.length}
          mergedEvents={mergedEvents.length}
          filteredEvents={findEvents.length}
        />
        <FindList events={findEvents} />
      </main>
    </div>
  );
}
