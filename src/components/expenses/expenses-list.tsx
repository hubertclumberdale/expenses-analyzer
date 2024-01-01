import { Expense, Income } from "@/types/types";
import React from "react";
import { AgGridReact } from "ag-grid-react";
import { Button, Col, Container, Row } from "react-bootstrap";
import { CellValueChangedEvent, ColDef } from "ag-grid-community";
import { useExpensesContext } from "@/contexts/expenses";
import ExpensesSelection from "@/components/expenses/expenses-selection";

interface ExpenseListProps {
  expenses: Expense[];
  onAddExpenses: (expenses: Expense[]) => void;
  onRemoveExpense: (id: string) => void;
  onUpdateExpense: () => void;
}

const IncomeList: React.FC<ExpenseListProps> = ({
  expenses,
  onAddExpenses,
  onRemoveExpense,
  onUpdateExpense,
}) => {
  const { createExpense, deleteExpense, updateExpense, refreshExpenses } =
    useExpensesContext();

  const columnDefs: ColDef<any>[] = [
    { headerName: "Date", field: "datetime", editable: true },
    { headerName: "Amount", field: "amount", editable: true },
    {
      headerName: "Actions",
      cellRenderer: (params: any) => (
        <Button
          variant="danger"
          onClick={() => handleDeleteExpense(params.node.rowIndex)}
        >
          Remove Expense
        </Button>
      ),
    },
  ];

  const rowData = expenses.map((expense) => ({
    date: expense.date?.toISOString?.()?.split("T")[0],
    amount: expense.amount,
  }));

  const handleDeleteExpense = async (index: number) => {
    const expense = expenses[index];
    if (expense._id) {
      await deleteExpense(expense);
      onRemoveExpense(expense._id?.toString());
    }
  };

  const handleGridCellValueChanged = async (
    event: CellValueChangedEvent<Income>
  ) => {
    const index = event?.rowIndex ?? -1;
    if (index < 0) {
      return;
    }
    const expense = expenses[index];
    if (expense._id) {
      const field = event.colDef.field as string;
      await updateExpense({
        ...expense,
        [field]: event.newValue,
      });
      await refreshExpenses();
      onUpdateExpense();
    }
  };

  return (
    <>
      <Container fluid>
        <Row>
          <div
            className="ag-theme-alpine"
            style={{ height: "400px", width: "100%" }}
          >
            <AgGridReact
              columnDefs={columnDefs}
              rowData={rowData}
              onCellValueChanged={handleGridCellValueChanged}
            ></AgGridReact>
          </div>
        </Row>
      </Container>
    </>
  );
};

export default IncomeList;
