import { useExpensesContext } from "@/contexts/expenses-context";
import { IExpense } from "@/types/Expenses";
import React, { useEffect, useState } from "react";
import { BarChart, Tooltip, XAxis, YAxis, Bar } from "recharts";

const BarChartTotalCost = () => {
  const { expenses } = useExpensesContext();

  const [localExpenses, setLocalExpenses] = useState<IExpense[]>([]);

  useEffect(() => {
    setLocalExpenses(expenses);
  }, [expenses]);
  return (
    <BarChart width={400} height={300} data={localExpenses}>
      <XAxis dataKey="reference" />
      <YAxis />
      <Bar dataKey="totalCost" fill="#8884d8" />
      <Tooltip />
    </BarChart>
  );
};

export default BarChartTotalCost;
