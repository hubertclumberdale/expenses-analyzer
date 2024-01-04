import { Bill } from "@/types/types";
import React from "react";
import { AgGridReact } from "ag-grid-react";
import { Button, Container, Row } from "react-bootstrap";
import { CellValueChangedEvent, ColDef } from "ag-grid-community";
import { useBillsContext } from "@/contexts/bills";

interface BillListProps {
  bills: Bill[];
  onRemoveBill: (id: string) => void;
  onUpdateBill: (bill: Bill) => void;
}

const BillList: React.FC<BillListProps> = ({
  bills,
  onRemoveBill,
  onUpdateBill,
}) => {
  const { deleteBill, updateBill } = useBillsContext();

  const columnDefs: ColDef<Bill>[] = [
    { headerName: "Id", flex: 1, field: "_id" },
    { headerName: "Transaction ID", field: "transactionId", editable: true },
    { headerName: "Date", field: "date", editable: true },
    {
      headerName: "Amount",
      field: "amount",
      cellDataType: "number",
      editable: true,
    },
    {
      headerName: "Paid",
      field: "paid",
      cellDataType: "boolean",
      editable: true,
    },
    {
      headerName: "Actions",
      cellRenderer: (params: any) => (
        <Button
          variant="danger"
          onClick={() => handleDeleteBill(params.node.rowIndex)}
        >
          Remove Bill
        </Button>
      ),
    },
  ];

  const handleDeleteBill = async (index: number) => {
    const bill = bills[index];
    if (bill._id) {
      await deleteBill(bill);
      onRemoveBill(bill._id?.toString());
    }
  };

  const handleCellValueChanged = async (event: CellValueChangedEvent<Bill>) => {
    const index = event?.rowIndex ?? -1;
    if (index < 0) {
      return;
    }
    const bill = bills[index];
    if (bill._id) {
      const field = event.colDef.field as string;
      const updatedBill = {
        ...bill,
        [field]: event.newValue,
      };
      await updateBill(updatedBill);
      onUpdateBill(updatedBill);
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
              rowData={bills}
              onCellValueChanged={handleCellValueChanged}
            ></AgGridReact>
          </div>
        </Row>
      </Container>
    </>
  );
};

export default BillList;
