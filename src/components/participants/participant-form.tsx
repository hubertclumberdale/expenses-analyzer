import React, { useEffect, useState } from "react";
import {
  Button,
  Form,
  ListGroup,
  Row,
  Col,
  Card,
  Container,
} from "react-bootstrap";
import { Participant, TransactionType } from "@/types/types";

interface ParticipantFormProps {
  participant: Participant;
  onSave: (editedParticipant: Participant) => void;
}

const ParticipantForm: React.FC<ParticipantFormProps> = ({
  participant,
  onSave,
}) => {
  const [editedParticipant, setEditedParticipant] =
    useState<Participant>(participant);

  useEffect(() => {
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
      <Card>
        <Card.Header>
          <Card.Title>Add a new Participant</Card.Title>
        </Card.Header>
        <Card.Body>
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
            {!!editedParticipant.incomes.length && (
              <Form.Label>Incomes:</Form.Label>
            )}
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
          </Form.Group>
        </Card.Body>
        <Card.Footer>
          <Container>
            <Row className="mt-2">
              <Col>
                <Button variant="secondary" onClick={handleAddIncome}>
                  Add Income
                </Button>
              </Col>
              <Col>
                <Button variant="primary" onClick={handleSave}>
                  Save Changes
                </Button>
              </Col>
            </Row>
          </Container>
        </Card.Footer>
      </Card>
    </Form>
  );
};

export default ParticipantForm;
