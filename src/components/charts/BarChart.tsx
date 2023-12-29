import { Expense } from "@/types/types";
import React, { useEffect, useState } from "react";
import {
  BarChart as RechartBarChart,
  Tooltip,
  XAxis,
  YAxis,
  Bar,
} from "recharts";

const BarChart = ({
  expenses,
  dataKey,
}: {
  expenses: Expense[];
  dataKey: string;
}) => {
  const [localExpenses, setLocalExpenses] = useState<Expense[]>([]);

  useEffect(() => {
    setLocalExpenses(expenses);
  }, [expenses]);
  return (
    <RechartBarChart width={400} height={300} data={localExpenses}>
      <XAxis dataKey="date" />
      <YAxis />
      <Bar dataKey={dataKey} fill="#8884d8" />
      <Tooltip />
    </RechartBarChart>
  );
};

export default BarChart;
