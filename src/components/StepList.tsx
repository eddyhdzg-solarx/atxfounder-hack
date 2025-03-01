import { FC } from "react";

interface StepListProps {
  marisaEvents: number;
  entreEvents: number;
  mergedEvents: number;
  filteredEvents: number;
  dbEvents: number;
}

export const StepList: FC<StepListProps> = ({
  marisaEvents,
  entreEvents,
  mergedEvents,
  filteredEvents,
  dbEvents,
}) => {
  return (
    <ul className="flex flex-col gap-2">
      <li className="flex gap-2">
        <h2 className="text-2xl font-bold">Marisa Events:</h2>
        <pre className="text-2xl font-mono">{marisaEvents}</pre>
      </li>
      <li className="flex gap-2">
        <h2 className="text-2xl font-bold">Entre Events:</h2>
        <pre className="text-2xl font-mono">{entreEvents}</pre>
      </li>
      <li className="flex gap-2">
        <h2 className="text-2xl font-bold">Merged Events:</h2>
        <pre className="text-2xl font-mono">{mergedEvents}</pre>
      </li>
      <li className="flex gap-2">
        <h2 className="text-2xl font-bold">Filtered Duplicates Events:</h2>
        <pre className="text-2xl font-mono">{filteredEvents}</pre>
      </li>
      <li className="flex gap-2">
        <h2 className="text-2xl font-bold">DB Events:</h2>
        <pre className="text-2xl font-mono">{dbEvents}</pre>
      </li>
    </ul>
  );
};
