import { useExpensesContext } from "@/contexts/expenses";
import { Expense } from "@/types/types";
import { data } from "autoprefixer";
import { useState, useEffect } from "react";
import { Tooltip } from "react-bootstrap";
import { RadialBarChart, RadialBar, Legend } from "recharts";

const RadialBarChartTotalCostType = () => {
  const { expenses } = useExpensesContext();

  const [localExpenses, setLocalExpenses] = useState<Expense[]>([]);

  useEffect(() => {
    setLocalExpenses(expenses);
  }, [expenses]);
  return (
    <>
      <RadialBarChart
        width={400}
        height={300}
        innerRadius="10%"
        outerRadius="80%"
        data={localExpenses}
      >
        <RadialBar dataKey="totalCost" fill="#8884d8" />
        <Legend />
        <Tooltip />
      </RadialBarChart>
    </>
  );
};

export default RadialBarChartTotalCostType;
