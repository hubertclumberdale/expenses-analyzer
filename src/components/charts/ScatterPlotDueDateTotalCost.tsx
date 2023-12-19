import { useExpensesContext } from "@/contexts/expenses-context";
import { IExpense } from "@/types/Expenses";
import { data } from "autoprefixer";
import { useState, useEffect } from "react";
import { Tooltip } from "react-bootstrap";
import { ScatterChart, XAxis, YAxis, Scatter } from "recharts";

const ScatterPlotDueDateTotalCost = () => {
  const { expenses } = useExpensesContext();

  const [localExpenses, setLocalExpenses] = useState<IExpense[]>([]);

  useEffect(() => {
    setLocalExpenses(expenses);
  }, [expenses]);
  return (
    <>
      <ScatterChart width={400} height={300}>
        <XAxis dataKey="dueDate" />
        <YAxis />
        <Scatter data={localExpenses} fill="#8884d8" />
        <Tooltip />
      </ScatterChart>
    </>
  );
};

export default ScatterPlotDueDateTotalCost;
