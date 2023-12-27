"use client";
import { updateExpenseAction } from "@/actions/expenses";
import ExpensesTable from "@/components/expenses-table";
import { useExpensesContext } from "@/contexts/expenses";
import { Expense } from "@/types/types";
import { startTransition } from "react";

const Page = () => {
  const { expenses, results, refreshExpenses } = useExpensesContext();

  const updateExpense = async (expense: Expense) => {
    await updateExpenseAction({
      expense: {
        ...expense,
      },
      path: "/with-server-actions",
    });
    refreshExpenses();
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
