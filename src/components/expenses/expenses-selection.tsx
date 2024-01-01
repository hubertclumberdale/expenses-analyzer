import ExpensesForm from "@/components/expenses/expenses-form";
import ExpensesUploader from "@/components/expenses/expenses-uploader";
import { Expense, TransactionType } from "@/types/types";
import React from "react";
import { Accordion, Button } from "react-bootstrap";

interface ExpensesSelectionProps {
  handleExpensesSubmit: (expenses: Expense[]) => void;
}

const ExpensesSelection: React.FC<ExpensesSelectionProps> = ({
  handleExpensesSubmit,
}) => {
  const addEmptyExpense = () => {
    handleExpensesSubmit([
      {
        amount: 0,
        date: new Date(),
        paid: false,
        transactionId: 0,
        type: TransactionType.EXPENSE,
      },
    ]);
  };
  return (
    <Accordion>
      <Accordion.Item eventKey="0">
        <Accordion.Header>Add a new expense manually</Accordion.Header>
        <Accordion.Body>
          <Button onClick={addEmptyExpense}>Add Expense</Button>
        </Accordion.Body>
      </Accordion.Item>
      <Accordion.Item eventKey="1">
        <Accordion.Header>...or do it automatically</Accordion.Header>
        <Accordion.Body>
          <ExpensesUploader onSuccess={handleExpensesSubmit}></ExpensesUploader>
        </Accordion.Body>
      </Accordion.Item>
    </Accordion>
  );
};

export default ExpensesSelection;
