export interface EntreEventLink {
  text: string;
  url: string;
}

export type EntreEvent = [
  find_name: string,
  url: string,
  ticketType: string,
  date: string,
  startTime: string,
  endTime: string,
  type: string,
  location: string
];
