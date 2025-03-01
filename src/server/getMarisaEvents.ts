import {
  MARISA_SHEET_ID,
  MARISA_SHEET_NAME,
  MARISA_SHEET_RANGE,
} from "@/consts";
import { MarisaEvent, MarisaEventLink } from "@/types";
import { getSheets } from "@/utils/getSheets";
import { unstable_cache } from "next/cache";

export const getMarisaEvents = unstable_cache(
  async (): Promise<MarisaEvent[]> => {
    const sheets = await getSheets();
    const range = `${MARISA_SHEET_NAME}!${MARISA_SHEET_RANGE}`;

    // First, get the spreadsheet data
    const response = await sheets.spreadsheets.get({
      spreadsheetId: MARISA_SHEET_ID,
      ranges: [range],
      includeGridData: true,
    });

    // Extract the grid data from the response
    const gridData = response.data.sheets?.[0].data?.[0];

    if (!gridData?.rowData) {
      return [];
    }

    // Transform the data to include both text and hyperlinks for column E only
    const values = gridData.rowData.map((row) => {
      if (!row.values) {
        return [
          "",
          "",
          "",
          "",
          { text: "", url: "" },
          "",
          "",
          "",
        ] as MarisaEvent;
      }

      return row.values.map((cell, columnIndex) => {
        const textValue = cell?.formattedValue || "";

        // Only extract hyperlink for column E (index 4)
        if (columnIndex === 4) {
          const hyperlink = cell?.hyperlink || "";
          return {
            text: textValue,
            url: hyperlink,
          } as MarisaEventLink;
        }

        // For other columns, just return the text value
        return textValue;
      }) as MarisaEvent;
    });

    // Filter out rows that don't have event data
    // A row has event data if it has start time (column 2) and an event title (column 4)
    const eventsOnly = values.filter((row): row is MarisaEvent => {
      return Boolean(row[0] && row[4]?.text); // Check start date and event title exist
    });

    return eventsOnly;
  },
  ["marisa-events"],
  { revalidate: 3600 } // Cache for 1 hour (3600 seconds)
);
