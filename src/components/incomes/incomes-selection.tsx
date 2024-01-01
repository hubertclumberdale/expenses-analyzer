import IncomesUploader from "@/components/incomes/incomes-uploader";
import { Income, TransactionType } from "@/types/types";
import React from "react";
import { Accordion, Button } from "react-bootstrap";

interface IncomesSelectionProps {
  handleIncomesSubmit: (incomes: Income[]) => void;
}

const IncomesSelection: React.FC<IncomesSelectionProps> = ({
  handleIncomesSubmit,
}) => {
  const addEmptyIncome = () => {
    handleIncomesSubmit([
      {
        amount: 0,
        date: new Date(),
        paid: false,
        transactionId: 0,
        type: TransactionType.INCOME,
      },
    ]);
  };
  return (
    <Accordion>
      <Accordion.Item eventKey="0">
        <Accordion.Header>Add a new income manually</Accordion.Header>
        <Accordion.Body>
          <Button onClick={addEmptyIncome}>Add Income</Button>
        </Accordion.Body>
      </Accordion.Item>
      <Accordion.Item eventKey="1">
        <Accordion.Header>...or do it automatically</Accordion.Header>
        <Accordion.Body>
          <IncomesUploader onSuccess={handleIncomesSubmit}></IncomesUploader>
        </Accordion.Body>
      </Accordion.Item>
    </Accordion>
  );
};

export default IncomesSelection;
