"use client";
import { updateExpenseAction } from "@/app/_action";
import ExpensesTable from "@/components/expenses-table";
import { useExpensesContext } from "@/contexts/expenses-context";
import { IExpense } from "@/types/Expenses";
import { startTransition } from "react";

const Page = () => {
  const { expenses, results } = useExpensesContext();

  const updateExpense = async (expense: IExpense) => {
    await updateExpenseAction({
      expense: {
        ...expense,
      },
      path: "/with-server-actions",
    });
  };
  return (
    <>
      <h1 className="text-2xl font-bold mb-4">Expenses List</h1>
      {results === 0 ? (
        <p className="text-center">No Expenses Found</p>
      ) : (
        expenses && (
          <ExpensesTable
            expenses={expenses}
            updateExpense={function (expense) {
              startTransition(() => {
                updateExpense(expense);
              });
            }}
            /* loading={loading > 0}
              deleteExpenses={deleteExpenses} */
          ></ExpensesTable>
        )
      )}
    </>
  );
};

export default Page;
