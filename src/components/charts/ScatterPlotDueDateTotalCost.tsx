import { useExpensesContext } from "@/contexts/expenses";
import { Expense } from "@/types/types";
import { data } from "autoprefixer";
import { useState, useEffect } from "react";
import { Tooltip } from "react-bootstrap";
import { ScatterChart, XAxis, YAxis, Scatter } from "recharts";

const ScatterPlotDueDateTotalCost = () => {
  const { expenses } = useExpensesContext();

  const [localExpenses, setLocalExpenses] = useState<Expense[]>([]);

  useEffect(() => {
    setLocalExpenses(expenses);
  }, [expenses]);
  return (
    <>
      <ScatterChart width={400} height={300}>
        <XAxis dataKey="dueDate" />
        <YAxis />
        <Scatter data={localExpenses} fill="#4e73df" />
        <Tooltip />
      </ScatterChart>
    </>
  );
};

export default ScatterPlotDueDateTotalCost;
