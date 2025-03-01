import { HomeHero } from "@/components/HomeHero";
import { HomeTable } from "@/components/HomeTable";
import { getScrapedEvents } from "@/server/getScrapedEvents";

export default async function Home() {
  const events = await getScrapedEvents();

  return (
    <div className="grid grid-rows-[20px_1fr_20px] items-center justify-items-center min-h-screen p-8 pb-20 gap-16 sm:p-20 font-[family-name:var(--font-geist-sans)]">
      <main className="flex flex-col gap-8 row-start-2 items-center sm:items-start max-w-[100%] w-full">
        <div className="flex flex-col gap-16 w-full">
          <HomeHero />
          <HomeTable events={events} />
          <div className="flex justify-center text-sm text-muted-foreground">
            {events?.length} events found
          </div>
        </div>
      </main>
    </div>
  );
}
