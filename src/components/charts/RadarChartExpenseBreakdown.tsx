import { useExpensesContext } from "@/contexts/expenses-context";
import { Expense } from "@/types/types";
import { data } from "autoprefixer";
import { useState, useEffect } from "react";
import { Tooltip } from "react-bootstrap";
import {
  RadarChart,
  PolarGrid,
  PolarAngleAxis,
  PolarRadiusAxis,
  Scatter,
} from "recharts";

const RadarChartExpenseBreakdown = () => {
  const { expenses } = useExpensesContext();

  const [localExpenses, setLocalExpenses] = useState<Expense[]>([]);

  useEffect(() => {
    setLocalExpenses(expenses);
  }, [expenses]);
  return (
    <>
      <RadarChart width={400} height={300} data={localExpenses}>
        <PolarGrid />
        <PolarAngleAxis dataKey="property" />
        <PolarRadiusAxis />
        <Scatter data={localExpenses} fill="#8884d8" />
        <Tooltip />
      </RadarChart>
    </>
  );
};

export default RadarChartExpenseBreakdown;
