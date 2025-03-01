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

interface ScrapedTableProps {
  events: Database["public"]["Tables"]["events"]["Row"][];
}

export const ScrapedTable: FC<ScrapedTableProps> = ({ events }) => {
  return (
    <div className="w-full">
      <Table>
        <TableCaption>A list of upcoming events in Austin.</TableCaption>
        <TableHeader>
          <TableRow>
            <TableHead className="w-[100px]">ID</TableHead>
            <TableHead>Event</TableHead>
            <TableHead>Description</TableHead>
            <TableHead>Location</TableHead>
            <TableHead>URL</TableHead>
            <TableHead className="w-[200px]">Date & Time</TableHead>
            <TableHead>Price</TableHead>
            <TableHead>Event Type</TableHead>
            <TableHead>Start</TableHead>
            <TableHead>End</TableHead>
            <TableHead>Is Event Page</TableHead>
            <TableHead className="w-[100px]">Open</TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {events.map((event, index) => {
            const date = event.find_date
              ? format(new Date(event.find_date), "MMMM d, yyyy h:mm a")
              : null;
            const start = event.start
              ? format(new Date(event.start), "MMMM d, yyyy h:mm a")
              : null;
            const end = event.end
              ? format(new Date(event.end), "MMMM d, yyyy h:mm a")
              : null;

            return (
              <TableRow key={index}>
                <TableCell>{event.id}</TableCell>
                <TableCell className="font-medium">
                  {event.find_title || event.title || "Untitled Event"}
                </TableCell>
                <TableCell className="max-w-[200px] truncate">
                  {event.description || "No description"}
                </TableCell>
                <TableCell>
                  {event.location_name ? (
                    <Button
                      asChild
                      variant="link"
                      size="sm"
                      className="h-auto p-0"
                    >
                      <Link
                        href={event.location_url || "#"}
                        target="_blank"
                        rel="noopener noreferrer"
                      >
                        {event.location_name}
                      </Link>
                    </Button>
                  ) : null}
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
                  {event.price !== null ? `$${event.price}` : null}
                </TableCell>
                <TableCell>
                  <div className="flex flex-col gap-1 text-xs">
                    {event.is_startup_event && <span>Startup Event</span>}
                    {event.for_investors && <span>For Investors</span>}
                    {event.free_drinks && <span>Free Drinks</span>}
                    {event.free_food && <span>Free Food</span>}
                    {event.needs_badge && <span>Badge Required</span>}
                    {event.staff_pick && <span>Staff Pick</span>}
                  </div>
                </TableCell>
                <TableCell>{start || null}</TableCell>
                <TableCell>{end || null}</TableCell>
                <TableCell>{event.is_event_page ? "Yes" : null}</TableCell>
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
