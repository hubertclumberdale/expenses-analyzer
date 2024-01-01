import { Income } from "@/types/types";
import React from "react";
import { AgGridReact } from "ag-grid-react";
import { Button, Container, Row } from "react-bootstrap";
import { CellValueChangedEvent, ColDef } from "ag-grid-community";
import { useIncomesContext } from "@/contexts/incomes";

interface IncomeListProps {
  incomes: Income[];
  onRemoveIncome: (id: string) => void;
  onUpdateIncome: () => void;
}

const IncomeList: React.FC<IncomeListProps> = ({
  incomes,
  onRemoveIncome,
  onUpdateIncome,
}) => {
  const { deleteIncome, updateIncome, refreshIncomes } = useIncomesContext();

  const columnDefs: ColDef<any>[] = [
    { headerName: "Date", field: "datetime", editable: true },
    { headerName: "Amount", field: "amount", editable: true },
    {
      headerName: "Actions",
      cellRenderer: (params: any) => (
        <Button
          variant="danger"
          onClick={() => handleDeleteIncome(params.node.rowIndex)}
        >
          Remove Income
        </Button>
      ),
    },
  ];

  const rowData = incomes.map((income) => ({
    date: income.date?.toISOString?.()?.split("T")[0],
    amount: income.amount,
  }));
  const handleDeleteIncome = async (index: number) => {
    const income = incomes[index];
    if (income._id) {
      await deleteIncome(income);
      onRemoveIncome(income._id?.toString());
    }
  };

  const handleGridCellValueChanged = async (
    event: CellValueChangedEvent<Income>
  ) => {
    const index = event?.rowIndex ?? -1;
    if (index < 0) {
      return;
    }
    const income = incomes[index];
    if (income._id) {
      const field = event.colDef.field as string;
      await updateIncome({
        ...income,
        [field]: event.newValue,
      });
      onUpdateIncome();
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
