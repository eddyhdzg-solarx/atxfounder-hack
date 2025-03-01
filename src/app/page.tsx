import { ScrapedTable } from "@/components/ScrapedTable";
import { getEvents } from "@/server";

export default async function Home() {
  const events = await getEvents();

  return (
    <div className="grid grid-rows-[20px_1fr_20px] items-center justify-items-center min-h-screen p-8 pb-20 gap-16 sm:p-20 font-[family-name:var(--font-geist-sans)]">
      <main className="flex flex-col gap-8 row-start-2 items-center sm:items-start max-w-[100%] w-full">
        <ScrapedTable events={events} />
      </main>
    </div>
  );
}
