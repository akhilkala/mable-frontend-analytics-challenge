import React, { ReactElement } from "react";
import { useData } from "../context/DataContext";
import { IChartState, IPieData } from "../utils/types";
import DateRange from "./DateRange";

interface Props {
  heading: string;
  state: {
    setStartDate: (date: Date) => void;
    setEndDate: (date: Date) => void;
    setData: (data: any) => void;
  } & IChartState;
  children: ReactElement;
  key: string;
}

export default function ChartSection({
  heading,
  state,
  children,
  key,
}: Props): ReactElement {
  const data = useData();

  const handleApply = async () => {
    const frequencies = data?.getReducedAmounts(
      data.sessions,
      state.startDate,
      state.endDate
    );

    const frequency = frequencies.device.deviceCategory;

    const pieData: IPieData[] = [];
    Object.keys(frequency).forEach((name) => {
      pieData.push({
        name,
        value: frequency[name],
      });
    });

    state.setData(pieData);
  };

  return (
    <section className="chart-section">
      <h1>{heading}</h1>
      <DateRange
        startDate={state.startDate}
        setStartDate={state.setStartDate}
        endDate={state.endDate}
        setEndDate={state.setEndDate}
        onApply={handleApply}
        key={key}
      />
      {!!state.data && children}
    </section>
  );
}
