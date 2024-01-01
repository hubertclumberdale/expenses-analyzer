import { useHouseholdContext } from "@/contexts/households";
import { Expense, Household } from "@/types/types";
import { CellValueChangedEvent, ColDef } from "ag-grid-community";
import { AgGridReact } from "ag-grid-react";
import Link from "next/link";
import { Button } from "react-bootstrap";

const HouseholdList = ({ households }: { households: Household[] }) => {
  const { editHousehold } = useHouseholdContext();

  const columnDefs: ColDef<Household>[] = [
    { flex: 1, headerName: "Name", field: "name", editable: true },
    {
      flex: 1,
      headerName: "Number of participants",
      valueGetter: (params: any) => params.data.participants.length,
    },
    {
      flex: 1,
      headerName: "Total expenses",
      valueGetter: (params: any) => {
        const expenses = params.data.expenses as Expense[];
        const total = expenses.reduce(
          (acc, expense) => acc + expense.amount,
          0
        );
        return `€ ${total}`;
      },
    },
    {
      flex: 1,
      headerName: "View",
      cellRenderer: (params: any) => (
        <>
          <Link href={`households/${params.data._id}`}>
            <Button variant="primary">View Household</Button>
          </Link>
        </>
      ),
    },
    {
      headerName: "Edit",
      flex: 1,
      cellRenderer: (params: any) => (
        <>
          <Link href={`households/${params.data._id}/edit`}>
            <Button variant="warning">Edit Household</Button>
          </Link>
        </>
      ),
    },
    {
      headerName: "Delete",
      cellRenderer: (params: any) => (
        <Button
          variant="danger"
          onClick={() => console.log(params.node.rowIndex)}
        >
          Remove Income
        </Button>
      ),
    },
  ];

  const handleCellValueChanged = (event: CellValueChangedEvent<Household>) => {
    const { data } = event;
    editHousehold(data);
  };

  return (
    <div className="ag-theme-alpine" style={{ height: "400px", width: "100%" }}>
      <AgGridReact
        rowData={households}
        columnDefs={columnDefs}
        onCellValueChanged={handleCellValueChanged}
      />
    </div>
  );
};

export default HouseholdList;
