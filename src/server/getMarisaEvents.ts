import { MarisaEvent, MarisaEventLink } from "@/types";
import { google } from "googleapis";

export async function getMarisaEvents(): Promise<MarisaEvent[]> {
  const auth = await google.auth.getClient({
    scopes: ["https://www.googleapis.com/auth/spreadsheets.readonly"],
  });

  const sheets = google.sheets({ version: "v4", auth });
  const range = `${process.env.MARISA_SHEET_NAME}!${process.env.MARISA_SHEET_RANGE}`;

  // First, get the spreadsheet data
  const response = await sheets.spreadsheets.get({
    spreadsheetId: process.env.MARISA_SHEET_ID,
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
      return ["", "", "", "", { text: "", url: "" }, "", "", ""] as MarisaEvent;
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
    return Boolean(row[2] && row[4]?.text); // Check if start time exists and event title exists
  });

  return eventsOnly;
}
