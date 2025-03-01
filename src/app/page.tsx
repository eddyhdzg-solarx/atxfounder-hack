import { getEntreEvents, getMarisaEvents } from "@/server";

export default async function Home() {
  const marisaEvents = await getMarisaEvents();
  const entreEvents = await getEntreEvents();

  return (
    <div className="grid grid-rows-[20px_1fr_20px] items-center justify-items-center min-h-screen p-8 pb-20 gap-16 sm:p-20 font-[family-name:var(--font-geist-sans)]">
      <main className="flex flex-col gap-8 row-start-2 items-center sm:items-start">
        <div className="flex gap-2">
          <h1 className="text-2xl font-bold">Marisa Events:</h1>
          <pre className="text-2xl font-mono">{marisaEvents.length}</pre>
        </div>
        <div className="flex gap-2">
          <h1 className="text-2xl font-bold">Entre Events:</h1>
          <pre className="text-2xl font-mono">{entreEvents.length}</pre>
        </div>
        {/* <pre>{JSON.stringify(marisaEvents, null, 2)}</pre>
        <pre>{JSON.stringify(entreEvents, null, 2)}</pre> */}
      </main>
    </div>
  );
}
