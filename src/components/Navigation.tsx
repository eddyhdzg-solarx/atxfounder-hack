import { Badge } from "@/ui/badge";
import { Button } from "@/ui/button";
import { LinkedinIcon } from "lucide-react";
import Link from "next/link";
import { Container } from "./Container";

export function Navigation() {
  return (
    <nav className="w-full pt-4">
      <Container className="flex items-center justify-between">
        <div className="flex items-center space-x-1">
          <Button
            asChild
            variant="ghost"
            size="icon"
            className="h-auto w-auto rounded-md p-2 text-lg font-bold"
          >
            <Link href="/" className="text-base text-primary">
              ATX Founder
            </Link>
          </Button>
          <Badge variant="outline" className="shadow-sm shadow-primary/10">
            <span>Beta</span>
          </Badge>
        </div>
        <div className="flex items-center space-x-2">
          <Button
            asChild
            variant="ghost"
            size="icon"
            className="h-auto w-auto rounded-md p-2 [&_svg]:size-6"
          >
            <Link
              href="https://www.linkedin.com/newsletters/atx-founder-weekly-events-7248834988484272128/"
              target="_blank"
              rel="noopener noreferrer"
              className="text-muted-foreground hover:text-foreground"
            >
              <LinkedinIcon className="size-6" />
              <span className="sr-only">LinkedIn</span>
            </Link>
          </Button>
        </div>
      </Container>
    </nav>
  );
}
