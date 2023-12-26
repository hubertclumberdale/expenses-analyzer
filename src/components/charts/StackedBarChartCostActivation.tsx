import { useExpensesContext } from "@/contexts/expenses-context";
import { Expense } from "@/types/types";
import { data } from "autoprefixer";
import { useEffect, useState } from "react";
import { Tooltip } from "react-bootstrap";
import { BarChart, XAxis, YAxis, Bar } from "recharts";

const StackedBarChartCostActivation = () => {
  const { expenses } = useExpensesContext();

  const [localExpenses, setLocalExpenses] = useState<Expense[]>([]);

  useEffect(() => {
    setLocalExpenses(expenses);
  }, [expenses]);
  return (
    <>
      <BarChart
        width={400}
        height={300}
        data={localExpenses}
        stackOffset="sign"
      >
        <XAxis dataKey="reference" />
        <YAxis />
        <Bar dataKey="cost" fill="#8884d8" />
        <Bar dataKey="activationCost" fill="#82ca9d" />
        <Tooltip />
      </BarChart>
    </>
  );
};

export default StackedBarChartCostActivation;
