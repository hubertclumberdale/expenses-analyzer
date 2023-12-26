import { useExpensesContext } from "@/contexts/expenses-context";
import { Expense } from "@/types/types";
import { useEffect, useState } from "react";
import { Tooltip } from "react-bootstrap";
import { Line, LineChart, XAxis, YAxis } from "recharts";

const LineChartConsumption = () => {
  const { expenses } = useExpensesContext();

  const [localExpenses, setLocalExpenses] = useState<Expense[]>([]);

  useEffect(() => {
    setLocalExpenses(expenses);
  }, [expenses]);
  return (
    <>
      <LineChart width={400} height={300} data={localExpenses}>
        <XAxis dataKey="issuedDate" />
        <YAxis />
        <Line type="monotone" dataKey="consumption" stroke="#8884d8" />
        <Tooltip />
      </LineChart>
    </>
  );
};

export default LineChartConsumption;
