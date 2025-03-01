import { ServerThemeProvider } from "next-themes";
import type { PropsWithChildren } from "react";

export function ThemeProvider(props: PropsWithChildren) {
  return (
    <ServerThemeProvider
      attribute="class"
      defaultTheme="dark"
      enableSystem
      forcedTheme="dark"
      disableTransitionOnChange
      {...props}
    />
  );
}
