"use client";

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
import Link from "next/link";
import { FC } from "react";

interface HomeTableProps {
  events: Database["public"]["Tables"]["events"]["Row"][];
}

export const HomeTable: FC<HomeTableProps> = ({ events }) => {
  return (
    <div className="w-full">
      <Table>
        <TableCaption>A list of upcoming events in Austin.</TableCaption>
        <TableHeader>
          <TableRow>
            <TableHead>Event</TableHead>
            <TableHead>Description</TableHead>
            <TableHead>Location</TableHead>
            <TableHead>Date & Time</TableHead>
            <TableHead>Price</TableHead>
            <TableHead>Staff Pick</TableHead>
            <TableHead>For Startups?</TableHead>
            <TableHead>Free Food?</TableHead>
            <TableHead>Free Drinks?</TableHead>
            <TableHead>For Investors?</TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {events.map((event, index) => {
            const date = event.find_date
              ? format(new Date(event.find_date), "MMMM d, yyyy h:mm a")
              : null;

            return (
              <TableRow key={index}>
                <TableCell className="font-medium">
                  <Button
                    asChild
                    variant="link"
                    className="p-0 h-auto underline"
                  >
                    <Link href={event.url || "#"}>
                      {event.find_title || event.title || "Untitled Event"}
                    </Link>
                  </Button>
                </TableCell>
                <TableCell className="max-w-96 whitespace-pre-wrap">
                  {event.description || "No description"}
                </TableCell>
                <TableCell>
                  {event.location_url ? (
                    <Button
                      asChild
                      variant="link"
                      className="p-0 h-auto underline"
                    >
                      <Link href={event.location_url}>
                        {event.location_name || null}
                      </Link>
                    </Button>
                  ) : (
                    event.location_name || null
                  )}
                </TableCell>
                <TableCell>{date || null}</TableCell>
                <TableCell>
                  {event.price !== null ? `$${event.price}` : null}
                </TableCell>
                <TableCell>{event.staff_pick ? "🔥" : null}</TableCell>
                <TableCell>{event.is_startup_event ? "🚀" : null}</TableCell>
                <TableCell>{event.free_food ? "🌮" : null}</TableCell>
                <TableCell>{event.free_drinks ? "🥃" : null}</TableCell>
                <TableCell>{event.for_investors ? "🕵" : null}</TableCell>
              </TableRow>
            );
          })}
        </TableBody>
      </Table>
    </div>
  );
};
