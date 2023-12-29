import { Expense } from "@/types/types";
import { useEffect, useState } from "react";
import { Tooltip } from "react-bootstrap";
import { Line, LineChart as RechartLineChart, XAxis, YAxis } from "recharts";

const LineChart = ({
  expenses,
  dataKey,
}: {
  expenses: Expense[];
  dataKey: string;
}) => {
  const [localExpenses, setLocalExpenses] = useState<Expense[]>([]);

  useEffect(() => {
    setLocalExpenses(expenses);
  }, [expenses]);
  return (
    <>
      <RechartLineChart width={400} height={300} data={localExpenses}>
        <XAxis dataKey="date" />
        <YAxis />
        <Line type="monotone" dataKey={dataKey} stroke="#8884d8" />
        <Tooltip />
      </RechartLineChart>
    </>
  );
};

export default LineChart;
