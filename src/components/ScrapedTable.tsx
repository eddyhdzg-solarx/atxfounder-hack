"use client";

import { updateEventAction } from "@/actions/updateEvent";
import { cn } from "@/lib/utils";
import { scrapeEvent } from "@/server/scrapeEvent";
import { DBEvent } from "@/types";
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
import { ExternalLink, Loader2, Play, RefreshCw, Scroll } from "lucide-react";
import Link from "next/link";
import { FC, useEffect, useState } from "react";
import { toast } from "sonner";

interface ScrapedTableProps {
  scraped?: boolean | null;
  events: Database["public"]["Tables"]["events"]["Row"][];
}

export const ScrapedTable: FC<ScrapedTableProps> = ({
  scraped,
  events: initialEvents,
}) => {
  const [events, setEvents] = useState<Partial<DBEvent>[]>([]);
  const [isProcessing, setIsProcessing] = useState(false);
  const [processingEventId, setProcessingEventId] = useState<number | null>(
    null
  );

  // Initialize events state with initialEvents prop
  useEffect(() => {
    setEvents(initialEvents);
  }, [initialEvents]);

  const handleScrape = async (url: string, eventId: number | undefined) => {
    if (!url) return;

    setProcessingEventId(eventId || null);
    const res = await scrapeEvent(url);

    if (res.success && res.data) {
      // Update events state with new data
      setEvents((prevEvents) => {
        return prevEvents.map((event) => {
          if (event.id === eventId) {
            return {
              ...event,
              ...res.data,
              status: "scraped",
            } as DBEvent;
          }
          return event;
        });
      });

      // Update database
      await updateEventAction({
        ...events.find((e) => e.id === eventId),
        ...res.data,
        status: "scraped",
      } as DBEvent);
    } else {
      toast.error("Failed to scrape event.");
    }
    setProcessingEventId(null);
  };

  const handleScrapeAll = async () => {
    setIsProcessing(true);
    const unscrapedEvents = events.filter(
      (event) => event.status !== "scraped" && event.url
    );

    for (const event of unscrapedEvents) {
      if (event.url && event.id) {
        await handleScrape(event.url, event.id);
      }
    }
    setIsProcessing(false);
    toast.success("Finished processing events");
  };

  return (
    <div className="w-full">
      <div className="mb-4">
        <Button
          onClick={handleScrapeAll}
          disabled={isProcessing}
          className={cn("flex items-center gap-2", scraped && "hidden")}
        >
          {isProcessing ? (
            <Loader2 className="animate-spin" />
          ) : (
            <Play className="h-4 w-4" />
          )}
          {isProcessing ? "Processing..." : "Scrape All Remaining"}
        </Button>
      </div>
      <Table>
        <TableCaption>A list of upcoming events in Austin.</TableCaption>
        <TableHeader>
          <TableRow>
            <TableHead className="w-[100px]">Actions</TableHead>
            <TableHead className="w-[100px]">ID</TableHead>
            <TableHead>Event</TableHead>
            <TableHead>Description</TableHead>
            <TableHead>Location</TableHead>
            <TableHead>URL</TableHead>
            <TableHead className="w-[200px]">Date & Time</TableHead>
            <TableHead>Price</TableHead>
            <TableHead>Staff Pick</TableHead>
            <TableHead>For Startups?</TableHead>
            <TableHead>Free Food?</TableHead>
            <TableHead>Free Drinks?</TableHead>
            <TableHead>For Investors?</TableHead>
            <TableHead>Start</TableHead>
            <TableHead>End</TableHead>
            <TableHead>Is Event?</TableHead>
            <TableHead>Scraped?</TableHead>
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

            const isProcessingThisEvent = processingEventId === event.id;

            return (
              <TableRow key={index}>
                <TableCell className="flex gap-2">
                  {event.url && (
                    <>
                      <Button
                        variant="ghost"
                        size="sm"
                        onClick={() => handleScrape(event.url!, event.id)}
                        disabled={isProcessing || isProcessingThisEvent}
                      >
                        {isProcessingThisEvent ? (
                          <Loader2 className="h-4 w-4 animate-spin" />
                        ) : (
                          <RefreshCw className="h-4 w-4" />
                        )}
                      </Button>
                      <Button asChild variant="ghost" size="sm">
                        <Link
                          href={`https://atxfounder-hono.eddyhdzg.workers.dev/markdown?url=${event.url}`}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="flex items-center gap-1"
                        >
                          <Scroll className="h-4 w-4" />
                        </Link>
                      </Button>
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
                    </>
                  )}
                </TableCell>
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
                <TableCell>{event.staff_pick ? "🔥" : null}</TableCell>
                <TableCell>{event.is_startup_event ? "🚀" : null}</TableCell>
                <TableCell>{event.free_food ? "🌮" : null}</TableCell>
                <TableCell>{event.free_drinks ? "🥃" : null}</TableCell>
                <TableCell>{event.for_investors ? "🕵" : null}</TableCell>
                <TableCell>{start || null}</TableCell>
                <TableCell>{end || null}</TableCell>
                <TableCell>{event.is_event_page ? "🎉" : null}</TableCell>
                <TableCell>
                  {event.status === "scraped" ? "🤖" : null}
                </TableCell>
              </TableRow>
            );
          })}
        </TableBody>
      </Table>
    </div>
  );
};
