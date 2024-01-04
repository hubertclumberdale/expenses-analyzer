import { Expense, Transaction } from "@/types/types";
import React, { useEffect, useState } from "react";
import {
  BarChart as RechartBarChart,
  Tooltip,
  XAxis,
  YAxis,
  Bar,
} from "recharts";

const BarChart = ({
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
    <RechartBarChart width={400} height={300} data={localTransactions}>
      <XAxis dataKey="date" />
      <YAxis />
      <Bar dataKey={dataKey} fill="#8884d8" />
      <Tooltip />
    </RechartBarChart>
  );
};

export default BarChart;
