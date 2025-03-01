import { getEntreEvents, getMarisaEvents } from "@/server";
import { filterDuplicates } from "./filterDuplicates";
import { mergeEvents } from "./mergeEvents";

export const getFindEvents = async () => {
  const marisaEvents = await getMarisaEvents();
  const entreEvents = await getEntreEvents();
  const mergedEvents = mergeEvents(marisaEvents, entreEvents);
  const findEvents = filterDuplicates(mergedEvents);

  return {
    marisaEvents,
    entreEvents,
    mergedEvents,
    findEvents,
  };
};
