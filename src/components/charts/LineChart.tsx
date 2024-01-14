import { Transaction } from "@/types/types";
import { useEffect, useState } from "react";
import { Tooltip, Legend, CartesianGrid, ResponsiveContainer } from "recharts";
import { Line, LineChart as RechartLineChart, XAxis, YAxis } from "recharts";

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
    <ResponsiveContainer width="100%" height={300}>
      <RechartLineChart
        data={localTransactions

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
          .sort(
            (a, b) => new Date(a.date).getTime() - new Date(b.date).getTime()
          )}
      >
        <CartesianGrid strokeDasharray="3 3" />
        <XAxis dataKey="date" />
        <YAxis />
        <Tooltip content={<CustomTooltip />} />
        <Legend />
        <Line type="monotone" dataKey={dataKey} stroke="#8884d8" />
      </RechartLineChart>
    </ResponsiveContainer>
  );
};

export default LineChart;
