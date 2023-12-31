import BillsUploader from "@/components/bills/bills-uploader";
import { Bill, TransactionType } from "@/types/types";
import React from "react";
import { Accordion, Button } from "react-bootstrap";

interface BillsSelectionProps {
  handleBillsSubmit: (bills: Bill[]) => void;
}

const BillsSelection: React.FC<BillsSelectionProps> = ({
  handleBillsSubmit,
}) => {
  const addEmptyBill = () => {
    handleBillsSubmit([
      {
        name: "",
        amount: 0,
        date: new Date(),
        paid: false,
        transactionId: 0,
        type: TransactionType.BILL,
        fromDate: new Date(),
        toDate: new Date(),
        dueDate: new Date(),
        provider: "gas",
      },
    ]);
  };
  return (
    <Accordion>
      <Accordion.Item eventKey="0">
        <Accordion.Header>Add a new bill manually</Accordion.Header>
        <Accordion.Body>
          <Button onClick={addEmptyBill}>Add Bill</Button>
        </Accordion.Body>
      </Accordion.Item>
      <Accordion.Item eventKey="1">
        <Accordion.Header>...or do it automatically</Accordion.Header>
        <Accordion.Body>
          <BillsUploader
            onSuccess={(bills) => {
              handleBillsSubmit(bills);
            }}
          ></BillsUploader>
        </Accordion.Body>
      </Accordion.Item>
    </Accordion>
  );
};

export default BillsSelection;
