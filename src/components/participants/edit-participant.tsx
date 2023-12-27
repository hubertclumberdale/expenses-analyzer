import React, { useEffect, useState } from "react";
import { Button, Form, ListGroup, Row, Col } from "react-bootstrap";
import { Participant, TransactionType } from "@/types/types"; // Import your types

interface EditParticipantProps {
  participant: Participant;
  onSave: (editedParticipant: Participant) => void;
}

const EditParticipant: React.FC<EditParticipantProps> = ({
  participant,
  onSave,
}) => {
  const [editedParticipant, setEditedParticipant] =
    useState<Participant>(participant);

  useEffect(() => {
    // Set initial state when the participant prop changes
    setEditedParticipant(participant);
  }, [participant]);

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setEditedParticipant((prevData) => ({
      ...prevData,
      [name]: value,
    }));
  };

  const handleIncomeChange = (index: number, field: string, value: string) => {
    const newIncomes = [...editedParticipant.incomes];
    newIncomes[index] = { ...newIncomes[index], [field]: value };
    setEditedParticipant((prevData) => ({
      ...prevData,
      incomes: newIncomes,
    }));
  };

  const handleAddIncome = () => {
    setEditedParticipant((prevData) => ({
      ...prevData,
      incomes: [
        ...prevData.incomes,
        {
          transactionId: 0,
          date: new Date(),
          amount: 0,
          paid: true,
          owner: participant._id ?? "",

          type: TransactionType.INCOME,
        },
      ],
    }));
  };

  const handleRemoveIncome = (index: number) => {
    const newIncomes = [...editedParticipant.incomes];
    newIncomes.splice(index, 1);
    setEditedParticipant((prevData) => ({
      ...prevData,
      incomes: newIncomes,
    }));
  };

  const handleSave = () => {
    onSave(editedParticipant);
  };

  return (
    <Form>
      <Form.Group controlId="formParticipantName">
        <Form.Label>Participant Name:</Form.Label>
        <Form.Control
          type="text"
          name="name"
          value={editedParticipant.name}
          onChange={handleInputChange}
        />
      </Form.Group>
      <Form.Group controlId="formIncomes">
        <Form.Label>Incomes:</Form.Label>
        <ListGroup>
          {editedParticipant.incomes.map((income, index) => (
            <ListGroup.Item key={index}>
              <Row>
                <Col>
                  <Form.Label>Date:</Form.Label>
                  <Form.Control
                    type="date"
                    value={income.date?.toISOString?.()?.split("T")[0]}
                    onChange={(e) =>
                      handleIncomeChange(index, "date", e.target.value)
                    }
                  />
                </Col>
                <Col>
                  <Form.Label>Amount:</Form.Label>
                  <Form.Control
                    type="number"
                    value={income.amount}
                    onChange={(e) =>
                      handleIncomeChange(index, "amount", e.target.value)
                    }
                  />
                </Col>
                <Col>
                  <Button
                    variant="danger"
                    onClick={() => handleRemoveIncome(index)}
                  >
                    Remove Income
                  </Button>
                </Col>
              </Row>
            </ListGroup.Item>
          ))}
        </ListGroup>
        <Button variant="secondary" onClick={handleAddIncome}>
          Add Income
        </Button>
      </Form.Group>
      <Button variant="primary" onClick={handleSave}>
        Save Changes
      </Button>
    </Form>
  );
};

export default EditParticipant;
