import { EntreEvent } from "@/types";
import { google } from "googleapis";

export async function getEntreEvents(): Promise<EntreEvent[]> {
  const auth = await google.auth.getClient({
    scopes: ["https://www.googleapis.com/auth/spreadsheets.readonly"],
  });

  const sheets = google.sheets({ version: "v4", auth });
  const range = `${process.env.ENTRE_SHEET_NAME}!${process.env.ENTRE_SHEET_RANGE}`;

  // First, get the spreadsheet data
  const response = await sheets.spreadsheets.get({
    spreadsheetId: process.env.ENTRE_SHEET_ID,
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

    return row.values.map((cell) => cell?.formattedValue || "") as EntreEvent;
  });

  // Filter out rows that don't have event data
  // A row has event data if it has an event name (column 0) and a link (column 1)
  const eventsOnly = events.filter((row): row is EntreEvent => {
    return Boolean(row[0] && row[1]);
  });

  return eventsOnly;
}
