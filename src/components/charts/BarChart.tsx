import { Transaction } from "@/types/types";
import React, { useEffect, useState } from "react";
import {
  Bar,
  BarChart as RechartBarChart,
  CartesianGrid,
  Legend,
  ResponsiveContainer,
  Tooltip,
  XAxis,
  YAxis,
} from "recharts";

const CustomTooltip = ({ active, payload, label }: any) => {
  if (active && payload && payload.length) {
    return (
      <div className="custom-tooltip">
        <p className="label">{`${label} : € ${payload[0].value}`}</p>
      </div>
    );
  }

  return null;
};

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
    <ResponsiveContainer width="100%" height={300}>
      <RechartBarChart
        data={localTransactions
          .sort((a, b) => {
            return new Date(a.date).getTime() - new Date(b.date).getTime();
          })
          .map((transaction) => ({
            ...transaction,
            date: transaction.date
              ? new Date(transaction.date).toLocaleDateString("it-IT", {
                  day: "numeric",
                  month: "numeric",
                  year: "numeric",
                })
              : "",
          }))
          }
      >
        <CartesianGrid strokeDasharray="3 3" />
        <XAxis dataKey="date" />
        <YAxis />
        <Tooltip content={<CustomTooltip />} />
        <Legend />
        <Bar dataKey={dataKey} fill="#4e73df" />
      </RechartBarChart>
    </ResponsiveContainer>
  );
};

export default BarChart;
