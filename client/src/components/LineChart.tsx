import React, { ReactElement } from "react";
import {
  LineChart,
  Line,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  Legend,
} from "recharts";
import { ILineData } from "../utils/types";

interface Props {
  data: ILineData[];
}

export default function LineChartComponent({ data }: Props): ReactElement {
  return (
    <div className="line-chart">
      <LineChart width={500} height={300} data={data}>
        <CartesianGrid strokeDasharray="3 3" />
        <XAxis dataKey="name" />
        <YAxis />
        <Tooltip />
        <Legend />
        {/* <Line
        type="monotone"
        dataKey="pv"
        stroke="#8884d8"
        activeDot={{ r: 8 }}
      /> */}
        <Line type="monotone" dataKey="views" stroke="#82ca9d" />
      </LineChart>
    </div>
  );
}
