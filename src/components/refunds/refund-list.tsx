import { Participant, Transaction } from "@/types/types";
import React from "react";
import { AgGridReact } from "ag-grid-react";
import { Button, Col, Container, Row } from "react-bootstrap";
import { CellValueChangedEvent, ColDef } from "ag-grid-community";
import { useTransactionsContext } from "@/contexts/transactions";
import ParticipantDropdown from "@/components/participants/participant-dropdown";

interface RefundListProps {
  refunds: Transaction[];
  onRemoveRefund: (id: string) => void;
  onUpdateRefund: (refund: Transaction) => void;
}

const RefundList: React.FC<RefundListProps> = ({
  refunds,
  onRemoveRefund,
  onUpdateRefund,
}) => {
  const { deleteTransaction, updateTransaction } = useTransactionsContext();

  const columnDefs: ColDef<Transaction>[] = [
    { headerName: "Id", flex: 1, field: "_id" },
    { headerName: "Name", field: "name", editable: true },
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
    {
      headerName: "Actions",
      cellRenderer: (params: any) => (
        <Button
          variant="danger"
          onClick={() => handleDeleteRefund(params.node.rowIndex)}
        >
          Remove Expense
        </Button>
      ),
    },
  ];

  const handleDeleteRefund = async (index: number) => {
    const expense = refunds[index];
    if (expense._id) {
      await deleteTransaction(expense);
      onRemoveRefund(expense._id?.toString());
    }
  };

  const handleCellValueChanged = async (
    event: CellValueChangedEvent<Transaction>
  ) => {
    const index = event?.rowIndex ?? -1;
    if (index < 0) {
      return;
    }
    const expense = refunds[index];
    if (expense._id) {
      const field = event.colDef.field as string;
      const updatedExpense = {
        ...expense,
        [field]: event.newValue,
      };
      await updateTransaction(updatedExpense);
      onUpdateRefund(updatedExpense);
    }
  };

  const handleParticipantSelect = async ({
    bill,
    participant,
  }: {
    bill: Transaction;
    participant: Participant;
  }) => {
    if (!participant) {
      return;
    }
    const updatedBill = {
      ...bill,
      owner: participant,
    };
    onUpdateRefund(updatedBill);
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
              rowData={refunds}
              onCellValueChanged={handleCellValueChanged}
            ></AgGridReact>
          </div>
        </Row>
      </Container>
    </>
  );
};

export default RefundList;
