"use client";
import { updateExpenseAction } from "@/app/_action";
import ExpenseFormServerComponent from "@/components/expense-form-server";
import ExpensesTable from "@/components/expenses-table";
import { ExpenseClass } from "@/models/Expense";
import { startTransition, useEffect, useState } from "react";
import { Container, Row } from "react-bootstrap";

export default function Home() {
  const [expenses, setExpenses] = useState<ExpenseClass[]>([]);
  const [results, setResults] = useState<number>(0);
  const [isLoading, setLoading] = useState<boolean>(false);

  const fetchExpenses = async () => {
    console.log("fetching expenses");
    const url = process.env.NEXT_PUBLIC_HOST;
    const response = await fetch(`${url}/api/expenses`);
    const result = await response.json();
    const { status, expenses, results } = result;
    if (status !== "success") {
      setResults(0);
      return;
    }
    if (expenses) {
      setExpenses(expenses);
    }
    if (results) {
      setResults(results);
    }
  };

  const updateExpense = async (expense: ExpenseClass) => {
    setLoading(true);
    await updateExpenseAction({
      expense: {
        ...expense,
      },
      path: "/with-server-actions",
    });
    setLoading(false);
    console.log("updated expense");
  };

  useEffect(() => {
    if (!isLoading) {
      fetchExpenses();
    }
  }, [isLoading]);

  return (
    <Container className="mx-auto max-w-md p-4">
      <Row>
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
            ></ExpensesTable>
          )
        )}
      </Row>
      <hr></hr>
      <Row>
        <h1 className="text-2xl font-bold mb-4">Add a new expense</h1>
        <ExpenseFormServerComponent />
      </Row>
    </Container>
  );
}
