import React from "react";
import PieChart from "./components/Pie";
import DateRange from "./components/DateRange";
import Loading from "./components/Loading";
import useChartState from "./hooks/useChartState";
import useFetch from "./hooks/useFetch";
import { IPieData } from "./utils/types";

function App() {
  const pieState = useChartState();
  const lineState = useChartState();
  const fetcher = useFetch(`${process.env.REACT_APP_API_URI}/data`);

  // const getPieData = (cb: (entry: IData) => string | number) => {

  // };

  const handlePieApply = async () => {
    const frequency: any = {};
    fetcher.data
      ?.filter((entry) => {
        const EntryDateTime = new Date(entry.date).getTime();
        return (
          EntryDateTime > pieState.startDate.getTime() &&
          EntryDateTime < pieState.endDate.getTime()
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

    if (fetcher.data) {
      console.log(new Date(fetcher.data[0].date).getTime());
    }

    pieState.setData(pieData);
  };

  const handleLineApply = async () => {};

  if (fetcher.isLoading) {
    return (
      <div className="screen-center">
        <Loading />
      </div>
    );
  }

  return (
    <main className="app">
      <section className="app__section app__section--left">
        <h1>Device Category Ratio</h1>
        <DateRange
          startDate={pieState.startDate}
          setStartDate={pieState.setStartDate}
          endDate={pieState.endDate}
          setEndDate={pieState.setEndDate}
          onApply={handlePieApply}
        />
        {!!pieState.data && <PieChart data={pieState.data} />}
      </section>
      <section className="app__section app__section--right">
        <h1>Line Chart</h1>
        <DateRange
          startDate={lineState.startDate}
          setStartDate={lineState.setStartDate}
          endDate={lineState.endDate}
          setEndDate={lineState.setEndDate}
          onApply={handleLineApply}
        />
        {!!lineState.data && <PieChart data={lineState.data} />}
      </section>
    </main>
  );
}

export default App;
