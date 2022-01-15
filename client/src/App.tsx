import React from "react";
import PieChart from "./components/PieChart";
import useChartState from "./hooks/useChartState";
import ChartSection from "./components/ChartSection";

function App() {
  const pieState = useChartState();
  const lineState = useChartState();

  return (
    <main className="app">
      <ChartSection heading="Device Category Ratio" state={pieState}>
        <PieChart data={pieState.data} />
      </ChartSection>
      <ChartSection heading="Line Chart" state={lineState}>
        <PieChart data={lineState.data} />
      </ChartSection>
    </main>
  );
}

export default App;
