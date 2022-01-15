import React, { ReactElement } from "react";
import { PieChart, Pie, Cell } from "recharts";
import { IPieData } from "../utils/types";

interface Props {
  data: IPieData[];
}

interface ICustomizedLabelOptions {
  cx: string;
  cy: string;
  midAngle: string;
  innerRadius: number;
  outerRadius: number;
  percent: number;
}

const COLORS = ["#0088FE", "#00C49F", "#FFBB28", "#FF8042"];

const RADIAN = Math.PI / 180;
const renderCustomizedLabel = ({
  cx,
  cy,
  midAngle,
  innerRadius,
  outerRadius,
  percent,
}: ICustomizedLabelOptions) => {
  const radius = innerRadius + (outerRadius - innerRadius) * 0.5;
  const x = cx + radius * Math.cos(-midAngle * RADIAN);
  const y = cy + radius * Math.sin(-midAngle * RADIAN);

  return (
    <text
      x={x}
      y={y}
      fill="white"
      textAnchor={x > cx ? "start" : "end"}
      dominantBaseline="central"
      style={{ fontWeight: "bold", fontFamily: "sans-serif" }}
    >
      {`${(percent * 100).toFixed(0)}%`}
    </text>
  );
};

export default function PieChartComponent({ data }: Props): ReactElement {
  return (
    <div className="pie-chart">
      <div className="pie-chart__labels">
        <div className="pie-chart__total">
          <b>Total: </b>
          {data.map(({ value }) => value).reduce((acc, c) => acc + c, 0)}
        </div>
        {data.map(({ name }, index) => (
          <div className="pie-chart__label">
            <div
              style={{ backgroundColor: COLORS[index] }}
              className="pie-chart__dot"
            ></div>
            {name.charAt(0).toUpperCase() + name.slice(1)}
          </div>
        ))}
      </div>
      <PieChart width={400} height={400}>
        <Pie
          data={data}
          cx="50%"
          cy="50%"
          labelLine={false}
          label={renderCustomizedLabel}
          fill="#8884d8"
          dataKey="value"
        >
          {data.map((entry, index) => (
            <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
          ))}
        </Pie>
      </PieChart>
    </div>
  );
}
