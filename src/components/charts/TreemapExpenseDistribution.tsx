import { useExpensesContext } from "@/contexts/expenses-context";
import { IExpense } from "@/types/Expenses";
import { data } from "autoprefixer";
import { useState, useEffect } from "react";
import { Tooltip } from "react-bootstrap";
import { Treemap } from "recharts";

const TreemapExpenseDistribution = () => {
  const { expenses } = useExpensesContext();

  const [localExpenses, setLocalExpenses] = useState<IExpense[]>([]);

  useEffect(() => {
    setLocalExpenses(expenses);
  }, [expenses]);
  return (
    <>
      <Treemap
        width={400}
        height={300}
        data={localExpenses}
        dataKey="totalCost"
        aspectRatio={4 / 3}
      >
        <Tooltip />
      </Treemap>
    </>
  );
};

export default TreemapExpenseDistribution;
