import { IExpense } from "@/types/Expenses";
import React, { useEffect, useState } from "react";
import {
  RadarChart as RechartsRadarChart,
  Tooltip,
  PolarGrid,
  PolarAngleAxis,
  PolarRadiusAxis,
  Radar,
} from "recharts";

const RadarChart = ({ expenses }: { expenses: IExpense[] }) => {
  const [localExpenses, setLocalExpenses] = useState<IExpense[]>([]);

  useEffect(() => {
    setLocalExpenses(expenses);
  }, [expenses]);
  return (
    <RechartsRadarChart
      outerRadius={150}
      width={600}
      height={300}
      data={localExpenses}
    >
      <PolarGrid />
      <PolarAngleAxis dataKey="name" />
      <PolarRadiusAxis />
      <Tooltip />
      <Radar
        name="Cost"
        dataKey="cost"
        stroke="#8884d8"
        fill="#8884d8"
        fillOpacity={0.6}
      />
      <Radar
        name="Consumption"
        dataKey="consumption"
        stroke="#82ca9d"
        fill="#82ca9d"
        fillOpacity={0.6}
      />
    </RechartsRadarChart>
  );
};

export default RadarChart;
