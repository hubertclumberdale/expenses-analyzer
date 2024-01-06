import { Bill, Participant } from "@/types/types";
import React from "react";
import { AgGridReact } from "ag-grid-react";
import { Button, Col, Container, Row } from "react-bootstrap";
import { CellValueChangedEvent, ColDef } from "ag-grid-community";
import { useBillsContext } from "@/contexts/bills";
import ParticipantDropdown from "@/components/participants/participant-dropdown";

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
  const dateFormatter = (data: any) => {
    return data.value
      ? new Date(data.value).toLocaleDateString("it-IT", {
          day: "numeric",
          month: "numeric",
          year: "numeric",
        })
      : "";
  };

  const columnDefs: ColDef<Bill>[] = [
    { headerName: "Id", field: "_id" },
    {
      headerName: "Transaction ID",
      flex: 1,
      field: "transactionId",
      editable: true,
    },
    { headerName: "Name", field: "name", editable: true },
    {
      headerName: "Date",
      field: "date",
      editable: true,
      cellEditor: "agDateStringCellEditor",
      cellRenderer: dateFormatter,
    },
    {
      headerName: "From Date",
      field: "fromDate",
      editable: true,
      cellEditor: "agDateStringCellEditor",
      cellRenderer: dateFormatter,
    },
    {
      headerName: "To Date",
      field: "toDate",
      editable: true,
      cellEditor: "agDateStringCellEditor",
      cellRenderer: dateFormatter,
    },
    {
      headerName: "Due Date",
      field: "dueDate",
      editable: true,
      cellEditor: "agDateStringCellEditor",
      cellRenderer: dateFormatter,
    },
    { headerName: "Amount", field: "amount", editable: true },
    { headerName: "Paid", field: "paid", editable: true },
    {
      headerName: "Owner",
      field: "owner",
      editable: true,
      cellRenderer: (params: any) => (
        <Container>
          <Row>
            <Col>
              <ParticipantDropdown
                selectedParticipantId={params.data.owner?._id?.toString()}
                onParticipantSelect={(participant: Participant) => {
                  handleParticipantSelect({
                    bill: params.data,
                    participant,
                  });
                }}
              ></ParticipantDropdown>
            </Col>
          </Row>
        </Container>
      ),
    },
    { headerName: "Type", field: "type", editable: true },
    { headerName: "Consumption", field: "consumption", editable: true },
    { headerName: "Activation Cost", field: "activationCost", editable: true },
    {
      headerName: "Monthly Installments",
      field: "monthlyInstallments",
      editable: true,
    },
    { headerName: "Notes", field: "notes", editable: true },
    { headerName: "Provider", field: "provider", editable: true },
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
      onUpdateBill(updatedBill);
    }
  };

  const handleParticipantSelect = async ({
    bill,
    participant,
  }: {
    bill: Bill;
    participant: Participant;
  }) => {
    if (!participant) {
      return;
    }
    const updatedBill = {
      ...bill,
      owner: participant,
    };
    onUpdateBill(updatedBill);
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
