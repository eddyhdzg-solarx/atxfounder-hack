export interface MarisaEventLink {
  text: string;
  url: string;
}

export type MarisaEvent = [
  date: string,
  blank: string,
  startTime: string,
  endTime: string,
  event: MarisaEventLink,
  category: string,
  organizer: string,
  location: string
];
