import { useExpensesContext } from "@/contexts/expenses";
import { Expense } from "@/types/types";
import { useEffect, useState } from "react";
import { Tooltip } from "react-bootstrap";
import { Pie, PieChart } from "recharts";

const PieChartExpenseDistribution = () => {
  const { expenses } = useExpensesContext();

  const [localExpenses, setLocalExpenses] = useState<Expense[]>([]);

  useEffect(() => {
    setLocalExpenses(expenses);
  }, [expenses]);
  return (
    <>
      <PieChart width={400} height={300}>
        <Pie
          data={localExpenses}
          dataKey="totalCost"
          nameKey="type"
          fill="#8884d8"
        />
        <Tooltip />
      </PieChart>
    </>
  );
};

export default PieChartExpenseDistribution;
