import { ENTRE_SHEET_ID, ENTRE_SHEET_NAME, ENTRE_SHEET_RANGE } from "@/consts";
import { EntreEvent } from "@/types";
import { getSheets } from "@/utils/getSheets";
import { unstable_cache } from "next/cache";

export const getEntreEvents = unstable_cache(
  async (): Promise<EntreEvent[]> => {
    const sheets = await getSheets();
    const range = `${ENTRE_SHEET_NAME}!${ENTRE_SHEET_RANGE}`;

    // First, get the spreadsheet data
    const response = await sheets.spreadsheets.get({
      spreadsheetId: ENTRE_SHEET_ID,
      ranges: [range],
      includeGridData: true,
    });

    // Extract the grid data from the response
    const gridData = response.data.sheets?.[0].data?.[0];

    if (!gridData?.rowData) {
      return [];
    }

    // Transform the data to a cleaner format
    const events = gridData.rowData.map((row) => {
      if (!row.values) {
        return ["", "", "", "", "", "", "", ""] as EntreEvent;
      }

      return row.values.map((cell, index) => {
        const value = cell?.formattedValue || "";
        // Check if start time (index 4) or end time (index 5) have special values
        if (
          (index === 4 || index === 5) &&
          (value === "TBA" ||
            value === "Shared upon approval" ||
            value === "Shared upon Approval")
        ) {
          return null;
        }
        return value;
      }) as EntreEvent;
    });

    // Filter out rows that don't have event data and "All SXSW" dates
    // A row has event data if it has an event name (column 0) and a link (column 1)
    // Date is in column 3
    const eventsOnly = events.filter((row): row is EntreEvent => {
      const hasRequiredFields = Boolean(row[0] && row[1]);
      const date = row[3];
      return hasRequiredFields && date !== "All SXSW";
    });

    return eventsOnly;
  },
  ["entre-events"],
  { revalidate: 3600 } // Cache for 1 hour (3600 seconds)
);
