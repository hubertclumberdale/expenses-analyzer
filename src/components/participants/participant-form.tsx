import { Participant, TransactionType } from "@/types/types";
import { Types } from "mongoose";
import React, { useState } from "react";
import { Button, Col, Form, ListGroup, Row } from "react-bootstrap";

interface ParticipantFormProps {
  onSubmit: (participant: Participant) => void;
}

const ParticipantForm: React.FC<ParticipantFormProps> = ({ onSubmit }) => {
  const [participantData, setParticipantData] = useState<Participant>({
    name: "",
    incomes: [],
  });

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setParticipantData((prevData) => ({
      ...prevData,
      [name]: value,
    }));
  };

  const handleIncomeChange = (index: number, field: string, value: string) => {
    setParticipantData((prevData) => {
      const newIncomes = [...prevData.incomes];
      newIncomes[index] = { ...newIncomes[index], [field]: value };
      return { ...prevData, incomes: newIncomes };
    });
  };

  const handleAddIncome = () => {
    setParticipantData((prevData) => ({
      ...prevData,
      incomes: [
        ...prevData.incomes,
        {
          transactionId: 0,
          date: new Date(),
          amount: 0,
          paid: true,
          owner: prevData._id ?? "",
          type: TransactionType.INCOME,
        },
      ],
    }));
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    onSubmit(participantData);
  };

  const handleRemoveIncome = (index: number) => {
    setParticipantData((prevData) => {
      const newIncomes = [...prevData.incomes];
      newIncomes.splice(index, 1);
      return { ...prevData, incomes: newIncomes };
    });
  };

  return (
    <Form onSubmit={handleSubmit}>
      <Form.Group controlId="formParticipantName">
        <Form.Label>Participant Name:</Form.Label>
        <Form.Control
          type="text"
          name="name"
          value={participantData.name}
          onChange={handleInputChange}
        />
      </Form.Group>
      <Form.Group controlId="formIncomes">
        <Form.Label>Incomes:</Form.Label>
        <ListGroup>
          {participantData.incomes.map((income, index) => (
            <ListGroup.Item key={index}>
              <Row>
                <Col>
                  <Form.Label>Date:</Form.Label>
                  <Form.Control
                    type="date"
                    value={income.date.toISOString().split("T")[0]}
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
                  {/* Add Remove Income button */}
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
      <Button variant="primary" type="submit">
        Submit
      </Button>
    </Form>
  );
};
export default ParticipantForm;
