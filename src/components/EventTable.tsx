import { Database } from "@/types/supabase.types";
import {
  Table,
  TableBody,
  TableCaption,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/ui/table";
import { FC } from "react";

interface EventTableProps {
  events: Database["public"]["Tables"]["events"]["Row"][];
}

export const EventTable: FC<EventTableProps> = ({ events }) => {
  return (
    <div className="w-full max-w-7xl">
      <Table>
        <TableCaption>A list of upcoming events in Austin.</TableCaption>
        <TableHeader>
          <TableRow>
            <TableHead className="w-[100px]">ID</TableHead>
            <TableHead className="w-[250px]">Event</TableHead>
            <TableHead className="w-[150px]">Date</TableHead>
            <TableHead className="text-right">Link</TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {events.map((event, index) => {
            const date = event.find_date
              ? new Date(event.find_date).toLocaleDateString("en-US", {
                  weekday: "short",
                  month: "short",
                  day: "numeric",
                })
              : "TBA";

            return (
              <TableRow key={index}>
                <TableCell>{event.id}</TableCell>
                <TableCell className="font-medium">
                  {event.find_title || "Untitled Event"}
                </TableCell>
                <TableCell>{date}</TableCell>
                <TableCell className="text-right">
                  <a
                    href={event.url || ""}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-primary hover:underline"
                  >
                    View Event →
                  </a>
                </TableCell>
              </TableRow>
            );
          })}
        </TableBody>
      </Table>
    </div>
  );
};
