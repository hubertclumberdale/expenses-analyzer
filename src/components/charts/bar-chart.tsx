import { IExpense } from "@/types/Expenses";
import React, { useEffect, useState } from "react";
import {
  BarChart as RechartsBarChart,
  Tooltip,
  Legend,
  CartesianGrid,
  XAxis,
  YAxis,
  Bar,
} from "recharts";

const BarChart = ({ expenses }: { expenses: IExpense[] }) => {
  const [localExpenses, setLocalExpenses] = useState<IExpense[]>([]);

  useEffect(() => {
    setLocalExpenses(expenses);
  }, [expenses]);
  return (
    <RechartsBarChart
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
      <Bar dataKey="cost" fill="#8884d8" />
      <Bar dataKey="consumption" fill="#82ca9d" />
    </RechartsBarChart>
  );
};

export default BarChart;
