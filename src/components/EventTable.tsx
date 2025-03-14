import { Database } from "@/types/supabase.types";
import { Button } from "@/ui/button";
import {
  Table,
  TableBody,
  TableCaption,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/ui/table";
import { format } from "date-fns";
import { ExternalLink } from "lucide-react";
import Link from "next/link";
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
            <TableHead>Event</TableHead>
            <TableHead>URL</TableHead>
            <TableHead className="w-[200px]">Date & Time</TableHead>
            <TableHead className="w-[100px]">Open</TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {events.map((event, index) => {
            const date = event.find_date
              ? format(new Date(event.find_date), "MMMM d, yyyy h:mm a")
              : null;

            return (
              <TableRow key={index}>
                <TableCell>{event.id}</TableCell>
                <TableCell className="font-medium">
                  {event.find_title || "Untitled Event"}
                </TableCell>
                <TableCell className="max-w-[200px] truncate">
                  {event.url ? (
                    <Button
                      asChild
                      variant="link"
                      size="sm"
                      className="h-auto p-0"
                    >
                      <Link
                        href={event.url}
                        target="_blank"
                        rel="noopener noreferrer"
                      >
                        {event.url}
                      </Link>
                    </Button>
                  ) : (
                    "N/A"
                  )}
                </TableCell>
                <TableCell>{date}</TableCell>
                <TableCell>
                  {event.url && (
                    <Button asChild variant="ghost" size="sm">
                      <Link
                        href={event.url}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="flex items-center gap-1"
                      >
                        <ExternalLink className="h-4 w-4" />
                      </Link>
                    </Button>
                  )}
                </TableCell>
              </TableRow>
            );
          })}
        </TableBody>
      </Table>
    </div>
  );
};
