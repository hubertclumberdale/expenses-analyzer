import React from "react";
import { AgGridReact } from "ag-grid-react";
import { Button } from "react-bootstrap";
import { Participant } from "@/types/types";
import { ColDef, CellValueChangedEvent } from "ag-grid-community";
import Link from "next/link";
import { useParticipantsContext } from "@/contexts/participants";

interface ParticipantListProps {
  participants: Participant[];
  onDelete: ({
    index,
    participant,
  }: {
    index: number;
    participant: Participant;
  }) => void;
}

const ParticipantList: React.FC<ParticipantListProps> = ({
  participants,
  onDelete,
}) => {
  const { editParticipant } = useParticipantsContext();

  const columnDefs: ColDef<Participant>[] = [
    { headerName: "Id", flex: 1, field: "_id" },
    { headerName: "Name", flex: 1, field: "name", editable: true },
    {
      headerName: "Number of incomes",
      flex: 1,
      valueGetter: (params: any) => params.data?.incomes?.length,
    },
    {
      headerName: "Edit",
      flex: 1,
      cellRenderer: (params: any) => (
        <>
          <Link href={`/participants/${params?.data?._id}`}>
            <Button variant="warning">Edit Participant</Button>
          </Link>
        </>
      ),
    },
    {
      headerName: "Delete",
      flex: 1,
      cellRenderer: (params: any) => (
        <>
          <Button
            variant="danger"
            onClick={() => {
              onDelete({ index: params.rowIndex, participant: params.data });
            }}
          >
            Remove Participant
          </Button>
        </>
      ),
    },
  ];

  const handleCellValueChanged = (
    event: CellValueChangedEvent<Participant>
  ) => {
    const { data } = event;
    editParticipant(data);
  };

  return (
    <div className="ag-theme-alpine" style={{ height: "400px", width: "100%" }}>
      <AgGridReact
        columnDefs={columnDefs}
        rowData={participants}
        rowHeight={40}
        onCellValueChanged={handleCellValueChanged}
      ></AgGridReact>
    </div>
  );
};

export default ParticipantList;
