import { Expense, Participant } from "@/types/types";
import React from "react";
import { AgGridReact } from "ag-grid-react";
import { Button, Col, Container, Row } from "react-bootstrap";
import { CellValueChangedEvent, ColDef } from "ag-grid-community";
import { useExpensesContext } from "@/contexts/expenses";
import ParticipantDropdown from "@/components/participants/participant-dropdown";

interface ExpenseListProps {
  expenses: Expense[];
  onRemoveExpense: (id: string) => void;
  onUpdateExpense: (expense: Expense) => void;
}

const IncomeList: React.FC<ExpenseListProps> = ({
  expenses,
  onRemoveExpense,
  onUpdateExpense,
}) => {
  const { deleteExpense, updateExpense } = useExpensesContext();
  const dateFormatter = (data: any) => {
    return data.value
      ? new Date(data.value).toLocaleDateString("it-IT", {
          day: "numeric",
          month: "numeric",
          year: "numeric",
        })
      : "";
  };
  const columnDefs: ColDef<Expense>[] = [
    { headerName: "Id", flex: 1, field: "_id" },
    { headerName: "Name", field: "name", editable: true },
    { headerName: "Transaction ID", field: "transactionId", editable: true },
    {
      headerName: "Date",
      field: "date",
      editable: true,
      cellEditor: "agDateStringCellEditor",
      cellRenderer: dateFormatter,
    },
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
                    expense: params.data,
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
          onClick={() => handleDeleteExpense(params.node.rowIndex)}
        >
          Remove Expense
        </Button>
      ),
    },
  ];

  const handleParticipantSelect = async ({
    expense,
    participant,
  }: {
    expense: Expense;
    participant: Participant;
  }) => {
    if (!participant) {
      return;
    }
    const updatedExpense = {
      ...expense,
      owner: participant,
    };
    onUpdateExpense(updatedExpense);
  };

  const handleDeleteExpense = async (index: number) => {
    const expense = expenses[index];
    if (expense._id) {
      await deleteExpense(expense);
      onRemoveExpense(expense._id?.toString());
    }
  };

  const handleCellValueChanged = async (
    event: CellValueChangedEvent<Expense>
  ) => {
    const index = event?.rowIndex ?? -1;
    if (index < 0) {
      return;
    }
    const expense = expenses[index];
    if (expense._id) {
      const field = event.colDef.field as string;
      const updatedExpense = {
        ...expense,
        [field]: event.newValue,
      };
      await updateExpense(updatedExpense);
      onUpdateExpense(updatedExpense);
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
              rowData={expenses}
              onCellValueChanged={handleCellValueChanged}
              pinnedBottomRowData={[
                {
                  amount: expenses.reduce(
                    (acc, expense) => acc + (expense.amount ?? 0),
                    0
                  ),
                },
              ]}
            ></AgGridReact>
          </div>
        </Row>
      </Container>
    </>
  );
};

export default IncomeList;
