import { useExpensesContext } from "@/contexts/expenses-context";
import { IExpense } from "@/types/Expenses";
import { data } from "autoprefixer";
import { useState, useEffect } from "react";
import { Tooltip } from "react-bootstrap";
import { FunnelChart, Funnel } from "recharts";

const FunnelChartPaymentStatus = () => {
  const { expenses } = useExpensesContext();

  const [localExpenses, setLocalExpenses] = useState<IExpense[]>([]);

  useEffect(() => {
    setLocalExpenses(expenses);
  }, [expenses]);
  return (
    <>
      <FunnelChart width={400} height={300} data={localExpenses}>
        <Funnel dataKey="count" data={localExpenses} isAnimationActive>
          <Tooltip />
        </Funnel>
      </FunnelChart>
    </>
  );
};

export default FunnelChartPaymentStatus;
