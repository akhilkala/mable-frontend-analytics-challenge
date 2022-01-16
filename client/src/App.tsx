import React from "react";
import PieChart from "./components/PieChart";
import useChartState from "./hooks/useChartState";
import ChartSection from "./components/ChartSection";
import LineChart from "./components/LineChart";
import { useData } from "./context/DataContext";
import { IChartState, ILineData, IPieData } from "./utils/types";

function App() {
  const data = useData();
  const pieState = useChartState();
  const lineState = useChartState();

  const handlePieApply = async (state: IChartState) => {
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

  const handleLineApply = async (state: IChartState) => {
    let groupedData: any;
    switch (state.timelineFilter) {
      case "daily":
        groupedData = data?.getReducedAmountsByDay(
          data.sessions,
          state.startDate,
          state.endDate
        );
        break;
      case "monthly":
        groupedData = data?.getReducedAmountsByMonth(
          data.sessions,
          state.startDate,
          state.endDate
        );
        break;
      case "yearly":
        groupedData = data?.getReducedAmountsByYear(
          data.sessions,
          state.startDate,
          state.endDate
        );
        break;
      default:
        groupedData = data?.getReducedAmountsByDay(
          data.sessions,
          state.startDate,
          state.endDate
        );
    }

    const lineData: ILineData[] = [];
    Object.keys(groupedData).forEach((groupName) => {
      lineData.push({
        name: groupName,
        views: groupedData[groupName].totals.pageviews,
      });
    });
    state.setData(lineData);
  };

  return (
    <main className="app">
      <ChartSection
        onApply={handlePieApply}
        identifier="pie"
        heading="Device Category Ratio"
        state={pieState}
      >
        <PieChart data={pieState.data} />
      </ChartSection>
      <ChartSection
        timeLineSelection
        identifier="line"
        heading="Page View Count"
        state={lineState}
        onApply={handleLineApply}
      >
        <LineChart data={lineState.data} />
      </ChartSection>
    </main>
  );
}

export default App;
