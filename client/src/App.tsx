import React from "react";
import PieChart from "./components/PieChart";
import useChartState from "./hooks/useChartState";
import ChartSection from "./components/ChartSection";
import LineChart from "./components/LineChart";

function App() {
  const pieState = useChartState();
  const lineState = useChartState();

  return (
    <main className="app">
      <ChartSection key="pie" heading="Device Category Ratio" state={pieState}>
        <PieChart data={pieState.data} />
      </ChartSection>
      <ChartSection key="line" heading="Line Chart" state={lineState}>
        <LineChart />
      </ChartSection>
    </main>
  );
}

export default App;
