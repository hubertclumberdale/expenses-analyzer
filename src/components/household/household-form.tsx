import ExpensesForm from "@/components/expenses/expenses-form";
import ExpensesUploader from "@/components/expenses/expenses-uploader";
import ParticipantForm from "@/components/participants/participant-form";
import { useParticipantsContext } from "@/contexts/participants";
import { Expense, Household, Participant } from "@/types/types";
import React, { useEffect, useState } from "react";
import {
  Accordion,
  Button,
  Card,
  Col,
  Form,
  ListGroup,
  Row,
} from "react-bootstrap";

interface HouseholdFormProps {
  household: Household;
  onSubmit: (household: Household) => void;
  reloadHousehold: () => void;
}

const HouseholdForm: React.FC<HouseholdFormProps> = ({
  household,
  onSubmit,
  reloadHousehold,
}) => {
  const { participants } = useParticipantsContext();

  const [editedHousehold, setEditedHousehold] = useState<Household>({
    name: "",
    participants: [],
    expenses: [],
  });

  const [editedParticipant, setEditedParticipant] = useState<Participant>({
    name: "",
    incomes: [],
  });

  useEffect(() => {
    setEditedHousehold(household);
  }, [household]);

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setEditedHousehold((prevData) => ({
      ...prevData,
      [name]: value,
    }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    await onSubmit(editedHousehold);
  };

  const handleParticipantSelect = ($event: any) => {
    const participantId = $event.target.value;

    const foundParticipant = participants.find(
      (participant) => participant._id === participantId
    );
    if (foundParticipant) {
      addParticipant(foundParticipant);
    }
  };

  const addParticipant = (newParticipant: Participant) => {
    setEditedHousehold((prevData) => {
      return {
        ...prevData,
        participants: [...(prevData?.participants ?? []), newParticipant],
      };
    });
  };

  const handleParticipantSubmit = (submittedParticipant: Participant) => {
    addParticipant(submittedParticipant);
  };

  const handleRemoveParticipant = (index: number) => {
    const newParticipants = [...editedHousehold.participants];
    newParticipants.splice(index, 1);
    setEditedHousehold((prevData) => ({
      ...prevData,
      participants: newParticipants,
    }));
  };

  const handleExpensesSubmit = (submittedExpenses: Expense[]) => {
    submittedExpenses.forEach((expense) => addExpense(expense));
  };

  const addExpense = (newExpense: Expense) => {
    setEditedHousehold((prevData) => {
      return {
        ...prevData,
        expenses: [...(prevData?.expenses ?? []), newExpense],
      };
    });
  };

  const handleRemoveExpense = (index: number) => {
    const newExpenses = [...editedHousehold.expenses];
    newExpenses.splice(index, 1);
    setEditedHousehold((prevData) => ({
      ...prevData,
      expenses: newExpenses,
    }));
  };

  const editExistingParticipant = (
    index: number,
    participantToEdit: Participant
  ) => {
    setEditedHousehold((prevData) => {
      const newParticipants = [...prevData.participants];
      newParticipants[index] = participantToEdit;
      return {
        ...prevData,
        participants: newParticipants,
      };
    });
  };

  const editExistingExpense = (index: number, expensesToEdit: Expense[]) => {
    expensesToEdit.forEach((expense) => {
      setEditedHousehold((prevData) => {
        const newExpenses = [...prevData.expenses];
        newExpenses[index] = expense;
        return {
          ...prevData,
          expenses: newExpenses,
        };
      });
    });
    reloadHousehold();
  };

  const resetExistingExpenses = () => {
    setEditedHousehold((prevData) => {
      return {
        ...prevData,
        expenses: [...prevData.expenses],
      };
    });
  };

  return (
    <>
      <Form onSubmit={handleSubmit}>
        <Card>
          <Card.Header>Household</Card.Header>
          <Card.Body>
            <Form.Group controlId="formHouseholdName">
              <h5>Household Name:</h5>
              <Form.Control
                type="text"
                name="name"
                value={editedHousehold?.name}
                onChange={handleInputChange}
              />
            </Form.Group>
            <hr></hr>
            <h5>Participants:</h5>
            <ListGroup>
              {editedHousehold?.participants.length === 0 && (
                <span>No selected participants</span>
              )}
              {editedHousehold?.participants?.map((participant, index) => (
                <>
                  <ListGroup.Item key={index}>
                    <Row>
                      <Col>
                        <ParticipantForm
                          participant={participant}
                          onSave={(editedParticipant) =>
                            editExistingParticipant(index, editedParticipant)
                          }
                        ></ParticipantForm>
                      </Col>
                    </Row>
                    <Row className="mt-2">
                      <Col>
                        <Button
                          variant="danger"
                          onClick={() => handleRemoveParticipant(index)}
                        >
                          Remove Participant
                        </Button>
                      </Col>
                    </Row>
                  </ListGroup.Item>
                  <hr></hr>
                </>
              ))}
            </ListGroup>
            <hr></hr>
            <h5>Expenses:</h5>
            <ListGroup>
              {editedHousehold?.expenses.length === 0 && (
                <span>No selected expenses</span>
              )}
              {editedHousehold?.expenses?.map((expense, index) => (
                <ListGroup.Item key={index}>
                  <Row>
                    <Col>
                      <Form.Label>
                        <ExpensesForm
                          expenses={[expense]}
                          onSave={(editedExpenses) =>
                            editExistingExpense(index, editedExpenses)
                          }
                        ></ExpensesForm>
                      </Form.Label>
                    </Col>
                  </Row>
                  <Row>
                    <Col>
                      <Button
                        variant="danger"
                        onClick={() => handleRemoveExpense(index)}
                      >
                        Remove Expense
                      </Button>
                    </Col>
                  </Row>
                </ListGroup.Item>
              ))}
            </ListGroup>
            <hr></hr>
            <h5>Add participants</h5>
            <Accordion>
              <Accordion.Item eventKey="0">
                <Accordion.Header>
                  Add a new participant manually
                </Accordion.Header>
                <Accordion.Body>
                  <ParticipantForm
                    participant={editedParticipant}
                    onSave={handleParticipantSubmit}
                  ></ParticipantForm>
                </Accordion.Body>
              </Accordion.Item>
              <Accordion.Item eventKey="1">
                <Accordion.Header>
                  ...or select an existing one
                </Accordion.Header>
                <Accordion.Body>
                  <Form.Select
                    onChange={handleParticipantSelect}
                    aria-label="Default select example"
                  >
                    <option>Select an existing participant</option>
                    {participants.map((participant) => (
                      <option
                        key={participant._id?.toString()}
                        value={participant._id?.toString()}
                      >
                        {participant.name}
                      </option>
                    ))}
                  </Form.Select>
                </Accordion.Body>
              </Accordion.Item>
            </Accordion>
            <hr></hr>
            <h5>Add expenses</h5>
            <Accordion>
              <Accordion.Item eventKey="0">
                <Accordion.Header>Add a new expense manually</Accordion.Header>
                <Accordion.Body>
                  <ExpensesForm
                    expenses={[]}
                    onSave={handleExpensesSubmit}
                  ></ExpensesForm>
                </Accordion.Body>
              </Accordion.Item>
              <Accordion.Item eventKey="1">
                <Accordion.Header>...or do it automatically</Accordion.Header>
                <Accordion.Body>
                  <ExpensesUploader
                    onSuccess={handleExpensesSubmit}
                  ></ExpensesUploader>
                </Accordion.Body>
              </Accordion.Item>
            </Accordion>
          </Card.Body>
          <Card.Footer>
            <Button variant="primary" type="submit">
              Submit
            </Button>
          </Card.Footer>
        </Card>
      </Form>
    </>
  );
};

export default HouseholdForm;
