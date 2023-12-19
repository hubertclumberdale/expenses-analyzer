import React from "react";
import { AgGridReact } from "ag-grid-react";
import "ag-grid-community/styles/ag-grid.css";
import "ag-grid-community/styles/ag-theme-alpine.css";
import { IExpense } from "@/types/Expenses";

const columns = [
  {
    field: "reference",
    headerName: "Reference",
    flex: 1,
    editable: true,
  },

  {
    field: "fromDate",
    headerName: "From Date",
    editable: true,
    type: "date",
    flex: 1,
  },
  {
    field: "toDate",
    headerName: "To Date",
    editable: true,
    type: "date",
    flex: 1,
  },
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
  expenses: IExpense[];
  updateExpense: (expense: IExpense) => void;
}) => {
  return (
    <div className="ag-theme-alpine" style={{ height: 400, width: "100%" }}>
      <AgGridReact
        rowData={expenses.map((expense) => ({
          ...expense,
          id: expense._id?.toString(),
        }))}
        columnDefs={columns}
        onCellValueChanged={(params) => {
          updateExpense(params.data);
        }}
      />
    </div>
  );
};

export default ExpensesTable;
