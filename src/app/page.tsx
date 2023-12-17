import ExpenseFormServerComponent from "@/components/expense-form-server";
import ExpenseItemServerComponent from "@/components/expense-item-server";
import { getExpenses } from "@/lib/expenses-db";

export default async function Home() {
  const { expenses, results } = await getExpenses();

  return (
    <div className="container mx-auto max-w-md p-4">
      <ExpenseFormServerComponent />
      <h1 className="text-2xl font-bold mb-4">Expenses List</h1>
      {results === 0 ? (
        <p className="text-center">No Expenses Found</p>
      ) : (
        expenses?.map((expense) => (
          <ExpenseItemServerComponent key={expense.id} expense={expense} />
        ))
      )}
    </div>
  );
}
