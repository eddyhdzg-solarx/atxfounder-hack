import { FindEvent } from "@/types/findEvents.types";
import { FC } from "react";

interface FindListProps {
  events: FindEvent[];
}

export const FindList: FC<FindListProps> = ({ events }) => {
  return (
    <div className="space-y-4 w-full max-w-7xl">
      {events.map((event, index) => (
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
  );
};
