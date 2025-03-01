import { getMarisaEvents } from "@/server";

export default async function Home() {
  const sheet = await getMarisaEvents();

  return (
    <div className="grid grid-rows-[20px_1fr_20px] items-center justify-items-center min-h-screen p-8 pb-20 gap-16 sm:p-20 font-[family-name:var(--font-geist-sans)]">
      <main className="flex flex-col gap-8 row-start-2 items-center sm:items-start">
        <div className="flex gap-2">
          <h1 className="text-2xl font-bold">Marisa Events:</h1>
          <pre className="text-2xl font-mono">{sheet.length}</pre>
        </div>
      </main>
    </div>
  );
}
