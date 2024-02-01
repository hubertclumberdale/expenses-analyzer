import { Bill, Transaction } from "@/types/types";
import {
  ResponsiveContainer,
  PolarGrid,
  PolarAngleAxis,
  PolarRadiusAxis,
  Radar,
} from "recharts";
import { RadarChart as RechartRadarChart } from "recharts";
import { Tooltip } from "recharts";

const RadarChart = ({ transactions }: { transactions: Transaction[] }) => {
  const mergeAmountsSimilarTransactions = (transactions: Transaction[]) => {
    const mergedTransactions: {
      type: string;
      amount: number;
      provider: string;
    }[] = [];

    transactions
      .filter((transaction) => (transaction as Bill).provider)
      .forEach((transaction) => {
        const index = mergedTransactions.findIndex(
          (mergedTransaction) =>
            mergedTransaction.type === (transaction as Bill).provider
        );
        if (index === -1) {
          mergedTransactions.push({
            type: (transaction as Bill).provider,
            amount: transaction.amount,
            provider: (transaction as Bill).provider,
          });
        } else {
          mergedTransactions[index].amount += transaction.amount;
        }
      });

    transactions
      .filter((transaction) => !(transaction as Bill).provider)
      .forEach((transaction) => {
        const index = mergedTransactions.findIndex(
          (mergedTransaction) => mergedTransaction.type === transaction.type
        );
        if (index === -1) {
          mergedTransactions.push({
            type: transaction.type,
            amount: transaction.amount,
            provider: "",
          });
        } else {
          mergedTransactions[index].amount += transaction.amount;
        }
      });

    console.log(mergedTransactions);
    return mergedTransactions;
  };
  return (

    <ResponsiveContainer width="100%" height={300}>
      <RechartRadarChart
        cx="50%"
        cy="50%"
        outerRadius="80%"
        data={mergeAmountsSimilarTransactions(transactions)}
      >
        <PolarGrid />
        <PolarAngleAxis dataKey="type" />
        <PolarRadiusAxis />
        <Radar
          name="Total"
          dataKey="amount"
          stroke="#4e73df"
          fill="#4e73df"
          fillOpacity={0.6}
        />
        <Tooltip />
      </RechartRadarChart>
    </ResponsiveContainer>
  );
};

export default RadarChart;
