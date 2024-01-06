import { Transaction, TransactionType } from "@/types/types";
import React from "react";
import { Accordion, Button } from "react-bootstrap";

interface RefundSelectionProps {
  handleRefundsSubmit: (refunds: Transaction[]) => void;
}

const RefundSelection: React.FC<RefundSelectionProps> = ({
  handleRefundsSubmit,
}) => {
  const addEmptyRefund = () => {
    handleRefundsSubmit([
      {
        name: "",
        amount: 0,
        date: new Date(),
        paid: false,
        transactionId: 0,
        type: TransactionType.REFUND,
      },
    ]);
  };
  return (
    <Accordion>
      <Accordion.Item eventKey="0">
        <Accordion.Header>Add a new refund manually</Accordion.Header>
        <Accordion.Body>
          <Button onClick={addEmptyRefund}>Add Refund</Button>
        </Accordion.Body>
      </Accordion.Item>
    </Accordion>
  );
};

export default RefundSelection;
