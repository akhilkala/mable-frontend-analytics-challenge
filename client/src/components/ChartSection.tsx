import React, { ReactElement } from "react";
import { useData } from "../context/DataContext";
import { IChartState, IPieData } from "../utils/types";
import DateRange from "./DateRange";
import Select from "react-select";

interface Props {
  heading: string;
  state: IChartState;
  children: ReactElement;
  identifier: string;
  timeLineSelection?: boolean;
  onApply: (state: IChartState) => Promise<void>;
}

const options = [
  { value: "daily", label: "Daily" },
  { value: "monthly", label: "Monthly" },
  { value: "yearly", label: "Yearly" },
];

export default function ChartSection({
  heading,
  state,
  children,
  identifier,
  timeLineSelection,
  onApply,
}: Props): ReactElement {
  return (
    <section className="chart-section">
      <h1>{heading}</h1>
      <DateRange
        startDate={state.startDate}
        setStartDate={state.setStartDate}
        endDate={state.endDate}
        setEndDate={state.setEndDate}
        identifier={identifier}
      />
      {!!timeLineSelection && (
        <Select
          onChange={(option) =>
            state.setTimelineFilter(option?.value || "daily")
          }
          defaultValue={options[0]}
          className="chart-section__dropdown"
          options={options}
        />
      )}
      <button onClick={() => onApply(state)} className="chart-section__btn">
        Apply
      </button>
      {!!state.data && children}
    </section>
  );
}
