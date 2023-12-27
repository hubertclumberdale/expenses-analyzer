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
      <Button variant="primary" type="submit">
        Submit
      </Button>
    </Form>
  );
};
export default ParticipantForm;
