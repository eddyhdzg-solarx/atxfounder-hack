export interface MarisaEventLink {
  text: string;
  url: string;
}

export type MarisaEvent = [
  startDate: string,
  endDate: string,
  startTime: string,
  endTime: string,
  event: MarisaEventLink,
  industry: string,
  hostedBy: string,
  location: string
];
