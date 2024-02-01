import { Transaction } from "@/types/types";
import { useEffect, useState } from "react";
import { Tooltip, Legend, ResponsiveContainer } from "recharts";
import { Pie, PieChart as RechartsPieChart } from "recharts";

const PieChart = ({ transactions }: { transactions: Transaction[] }) => {
  const [expenseData, setExpenseData] = useState<
    { name: string; value: number }[]
  >([]);

  useEffect(() => {
    const data = transactions.reduce((acc: any, transaction) => {
      const existingOwner = acc.find(
        (item: any) => item.name === transaction.owner?.name || ""
      );
      if (existingOwner) {
        existingOwner.value += transaction.amount;
      } else {
        acc.push({
          name: transaction.owner?.name || "",
          value: transaction.amount,
        });
      }
      return acc;
    }, []);
    setExpenseData(data);
  }, [transactions]);

  return (
    <>
      <ResponsiveContainer width="100%" height={300}>
        <RechartsPieChart>
          <Pie
            data={expenseData}
            dataKey="value"
            nameKey="name"
            fill="#4e73df"
          />
          <Tooltip />
          <Legend />
        </RechartsPieChart>
      </ResponsiveContainer>
    </>
  );
};

export default PieChart;
