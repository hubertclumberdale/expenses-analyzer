import { Transaction } from "@/types/types";
import { useEffect, useState } from "react";
import { Tooltip } from "react-bootstrap";
import { Line, LineChart as RechartLineChart, XAxis, YAxis } from "recharts";

const LineChart = ({
  transactions,
  dataKey,
}: {
  transactions: Transaction[];
  dataKey: string;
}) => {
  const [localTransactions, setLocalTransactions] = useState<Transaction[]>([]);

  useEffect(() => {
    setLocalTransactions(transactions);
  }, [transactions]);
  return (
    <>
      <RechartLineChart width={400} height={300} data={localTransactions}>
        <XAxis dataKey="date" />
        <YAxis />
        <Line type="monotone" dataKey={dataKey} stroke="#8884d8" />
        <Tooltip />
      </RechartLineChart>
    </>
  );
};

export default LineChart;
