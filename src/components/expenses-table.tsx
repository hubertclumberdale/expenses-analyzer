import * as React from "react";
import { DataGrid, GridToolbar } from "@mui/x-data-grid";
import { ExpenseClass } from "@/models/Expense";

const columns = [
  { field: "name", headerName: "Name", flex: 1, editable: true },
  /* { field: "fromDate", headerName: "From Date", type: "date", flex: 1 },
  { field: "toDate", headerName: "To Date", type: "date", flex: 1 }, */
  { field: "cost", headerName: "Cost", flex: 1, editable: true },
  { field: "consumption", headerName: "Consumption", flex: 1, editable: true },
  {
    field: "activationCost",
    headerName: "Activation Cost",
    flex: 1,
    editable: true,
  },
  { field: "totalCost", headerName: "Total Cost", flex: 1, editable: true },
  { field: "paid", headerName: "Paid", flex: 1, editable: true },
  {
    field: "monthlyInstallments",
    headerName: "Monthly Installments",
    flex: 1,
    editable: true,
  },
  { field: "monthlyCost", headerName: "Monthly Cost", flex: 1, editable: true },
  { field: "notes", headerName: "Notes", flex: 1, editable: true },
];

const ExpensesTable = ({
  expenses,
  updateExpense,
}: {
  expenses: ExpenseClass[];
  updateExpense: (expense: ExpenseClass) => void;
}) => {
  return (
    <div style={{ height: 400, width: "100%" }}>
      <DataGrid
        rows={expenses.map((expense) => ({
          ...expense,
          id: expense._id?.toString(),
        }))}
        columns={columns}
        checkboxSelection
        components={{
          Toolbar: GridToolbar,
        }}
        processRowUpdate={(updatedRow) => {
          updateExpense(updatedRow);
          return updatedRow;
        }}
      />
    </div>
  );
};

export default ExpensesTable;
