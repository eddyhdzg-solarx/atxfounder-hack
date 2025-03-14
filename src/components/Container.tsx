import { cn } from "@/lib/utils";
import { DetailedHTMLProps, HTMLAttributes } from "react";

export type DivProps = DetailedHTMLProps<
  HTMLAttributes<HTMLDivElement>,
  HTMLDivElement
>;

export function Container({ className, ...rest }: DivProps) {
  return (
    <div
      className={cn("container mx-auto w-full px-4 md:px-6 lg:px-8", className)}
      {...rest}
    />
  );
}
