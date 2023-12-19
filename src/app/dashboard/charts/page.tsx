"use client";
import ExpensesCharts from "@/components/charts/expenses-charts";
import { ExpensesProvider } from "@/contexts/expenses-context";

const Page = () => {
  return (
    <>
      <ExpensesCharts></ExpensesCharts>
    </>
  );
};

export default Page;
