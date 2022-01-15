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
}

export default function ChartSection({
  heading,
  state,
  children,
}: Props): ReactElement {
  const data = useData();

  const handleApply = async () => {
    const frequency: any = {};
    data?.entries
      ?.filter((entry) => {
        const EntryDateTime = new Date(entry.date).getTime();
        return (
          EntryDateTime >= state.startDate.getTime() &&
          EntryDateTime <= state.endDate.getTime()
        );
      })
      ?.forEach((entry) => {
        if (frequency[entry.device.deviceCategory] === undefined) {
          frequency[entry.device.deviceCategory] = 0;
        } else {
          frequency[entry.device.deviceCategory]++;
        }
      });

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
      />
      {!!state.data && children}
    </section>
  );
}
