import { Bill, Transaction } from "@/types/types";
import { Tooltip, Legend, CartesianGrid, ResponsiveContainer } from "recharts";
import { Line, LineChart as RechartLineChart, XAxis, YAxis } from "recharts";
import { CurveType } from "recharts/types/shape/Curve";

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

interface ILine {
  type: CurveType;
  dataKey: string;
  name: string;
  data: Transaction[];
  stroke: string;
}

const MultipleLineChart = ({ lines }: { lines: ILine[] }) => {
  const sortAndFormatTransactions = (transactions: Transaction[]) => {
    return transactions
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
      }));
  };

  return (
    <ResponsiveContainer width="100%" height={300}>
      <RechartLineChart>
        <CartesianGrid strokeDasharray="3 3" />
        <XAxis dataKey="date" />
        <YAxis />
        <Tooltip content={<CustomTooltip />} />
        <Legend />
        {lines.map((line) => (
          <Line
            type={line.type}
            dataKey={line.dataKey}
            name={line.name}
            data={sortAndFormatTransactions(line.data)}
            stroke={line.stroke}
          />
        ))}
      </RechartLineChart>
    </ResponsiveContainer>
  );
};

export default MultipleLineChart;
