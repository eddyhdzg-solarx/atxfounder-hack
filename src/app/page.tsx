import { getEntreEvents, getMarisaEvents } from "@/server";
import { findEvents } from "@/utils/findEvents";

export default async function Home() {
  const marisaEvents = await getMarisaEvents();
  const entreEvents = await getEntreEvents();
  const mergedEvents = findEvents(marisaEvents, entreEvents);

  return (
    <div className="grid grid-rows-[20px_1fr_20px] items-center justify-items-center min-h-screen p-8 pb-20 gap-16 sm:p-20 font-[family-name:var(--font-geist-sans)]">
      <main className="flex flex-col gap-8 row-start-2 items-center sm:items-start">
        <ul className="flex flex-col gap-2">
          <li className="flex gap-2">
            <h2 className="text-2xl font-bold">Marisa Events:</h2>
            <pre className="text-2xl font-mono">{marisaEvents.length}</pre>
          </li>
          <li className="flex gap-2">
            <h2 className="text-2xl font-bold">Entre Events:</h2>
            <pre className="text-2xl font-mono">{entreEvents.length}</pre>
          </li>
          <li className="flex gap-2">
            <h2 className="text-2xl font-bold">Total Events:</h2>
            <pre className="text-2xl font-mono">{mergedEvents.length}</pre>
          </li>
        </ul>
        <div className="space-y-4 w-full max-w-7xl">
          {mergedEvents.map((event, index) => (
            <div
              key={index}
              className="border rounded-lg p-4 hover:bg-neutral-50/10 transition-colors"
            >
              <div className="flex justify-between items-start space-x-4">
                <h2 className="font-semibold">{event.find_title}</h2>
                <time className="text-sm">{event.find_date}</time>
              </div>
              <a
                href={event.url}
                target="_blank"
                rel="noopener noreferrer"
                className="text-blue-600 hover:underline text-sm mt-2 block"
              >
                View Event →
              </a>
            </div>
          ))}
        </div>
      </main>
    </div>
  );
}
