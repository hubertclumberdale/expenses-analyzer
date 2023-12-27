"use client";
import { Accordion } from "react-bootstrap";
import ExpenseFormServerComponent from "@/components/expense-form-server";
import PdfUploader from "@/components/pdf-uploader";
import { startTransition } from "react";
import { createExpenseAction } from "@/actions/expenses";
import { Expense } from "@/types/types";

const Page = () => {
  const createExpenses = async (expenses: Expense[]) => {
    expenses.forEach(async (expense) => {
      const newExpense = {
        ...expense,
      };
      await createExpenseAction({
        expense: newExpense,
        path: "/with-server-actions",
      });
    });
  };
  return (
    <>
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
                startTransition(() => {
                  createExpenses(expenses);
                });
              }}
            ></PdfUploader>
          </Accordion.Body>
        </Accordion.Item>
      </Accordion>
    </>
  );
};

export default Page;
