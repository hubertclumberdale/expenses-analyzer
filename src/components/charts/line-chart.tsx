import { IExpense } from "@/types/Expenses";
import React, { useEffect, useState } from "react";
import {
  LineChart as RechartsLineChart,
  Line,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  Legend,
} from "recharts";

const LineChart = ({ expenses }: { expenses: IExpense[] }) => {
  const [localExpenses, setLocalExpenses] = useState<IExpense[]>([]);

  useEffect(() => {
    setLocalExpenses(expenses);
  }, [expenses]);
  return (
    <RechartsLineChart
      width={600}
      height={300}
      data={localExpenses}
      margin={{ top: 20, right: 30, left: 20, bottom: 10 }}
    >
      <CartesianGrid strokeDasharray="3 3" />
      <XAxis dataKey="name" />
      <YAxis />
      <Tooltip />
      <Legend />
      <Line type="monotone" dataKey="cost" stroke="#8884d8" />
      <Line type="monotone" dataKey="consumption" stroke="#82ca9d" />
    </RechartsLineChart>
  );
};

export default LineChart;
