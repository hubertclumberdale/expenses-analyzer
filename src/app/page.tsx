"use client";
import {
  createExpenseAction,
  deleteExpenseAction,
  updateExpenseAction,
} from "@/app/_action";
import ExpensesCharts from "@/components/charts/expenses-charts";
import ExpenseFormServerComponent from "@/components/expense-form-server";
import ExpensesTable from "@/components/expenses-table";
import PdfUploader from "@/components/pdf-uploader";
import { Expense } from "@/types/Expenses";
import { startTransition, useEffect, useState } from "react";
import { Accordion, Col, Container, Row } from "react-bootstrap";

export default function Home() {
  const [expenses, setExpenses] = useState<Expense[]>([]);
  const [results, setResults] = useState<number>(0);
  const [loading, setLoading] = useState<boolean>(false);
  const [refresh, setRefresh] = useState<number>(0);

  const incrementRefresh = () => {
    const newRefresh = refresh + 1;
    setRefresh(newRefresh);
  };

  const fetchExpenses = async () => {
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

  const updateExpense = async (expense: Expense) => {
    setLoading(true);
    await updateExpenseAction({
      expense: {
        ...expense,
      },
      path: "/with-server-actions",
    });
    setLoading(false);
    incrementRefresh();
  };

  const createExpenses = async (expenses: Expense[]) => {
    console.log(expenses);
    setLoading(true);
    expenses.forEach(async (expense, index) => {
      const newExpense = {
        ...expense,
      };
      console.log(newExpense);
      await createExpenseAction({
        expense: newExpense,
        path: "/with-server-actions",
      });
    });
    setLoading(false);
  };

  const deleteExpenses = async (expenses: Expense[]) => {
    console.log(expenses);
    setLoading(true);
    expenses.forEach(async (expense) => {
      await deleteExpenseAction({
        expense,
        path: "/with-server-actions",
      });
    });
    setLoading(false);
  };

  useEffect(() => {
    fetchExpenses();
  }, [refresh]);

  return (
    <Container className="mx-auto max-w-md p-4">
      <Row>
        <Col lg={12}>
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
        </Col>
        <Col className="mt-4">
          <Accordion defaultActiveKey={"1"}>
            <Accordion.Item eventKey="0">
              <Accordion.Header>Add a new expense manually</Accordion.Header>
              <Accordion.Body>
                <ExpenseFormServerComponent />
              </Accordion.Body>
            </Accordion.Item>
            <Accordion.Item eventKey="1">
              <Accordion.Header>...or add it automatically</Accordion.Header>
              <Accordion.Body>
                <PdfUploader
                  onSuccess={function (expenses) {
                    console.log(expenses);
                    startTransition(() => {
                      createExpenses(expenses);
                    });
                  }}
                ></PdfUploader>
              </Accordion.Body>
            </Accordion.Item>
          </Accordion>
        </Col>
      </Row>
      <hr></hr>
      <Row>
        <Container>
          <Row>
            <Col>
              <hr></hr>
              <ExpensesCharts expenses={expenses}></ExpensesCharts>
            </Col>
          </Row>
        </Container>
      </Row>
    </Container>
  );
}
