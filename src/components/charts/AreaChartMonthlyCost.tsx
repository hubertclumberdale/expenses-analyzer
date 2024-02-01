import { useExpensesContext } from "@/contexts/expenses";
import { Expense } from "@/types/types";
import { useEffect, useState } from "react";
import { Tooltip } from "react-bootstrap";
import { Area, AreaChart, XAxis, YAxis } from "recharts";

const AreaChartMonthlyCost = () => {
  const { expenses } = useExpensesContext();

  const [localExpenses, setLocalExpenses] = useState<Expense[]>([]);

  useEffect(() => {
    setLocalExpenses(expenses);
  }, [expenses]);
  return (
    <>
      <AreaChart width={400} height={300} data={localExpenses}>
        <XAxis dataKey="issuedDate" />
        <YAxis />
        <Area type="monotone" dataKey="monthlyCost" fill="#4e73df" />
        <Tooltip />
      </AreaChart>
    </>
  );
};

export default AreaChartMonthlyCost;
