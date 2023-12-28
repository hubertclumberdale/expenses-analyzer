import ParticipantForm from "@/components/participants/participant-form";
import { useParticipantsContext } from "@/contexts/participants";
import { Household, Participant } from "@/types/types";
import React, { useEffect, useState } from "react";
import { Accordion, Button, Col, Form, ListGroup, Row } from "react-bootstrap";

interface HouseholdFormProps {
  household: Household;
  onSubmit: (household: Household) => void;
}

const HouseholdForm: React.FC<HouseholdFormProps> = ({
  household,
  onSubmit,
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

  return (
    <>
      <Form onSubmit={handleSubmit}>
        <Form.Group controlId="formHouseholdName">
          <Form.Label>Household Name:</Form.Label>
          <Form.Control
            type="text"
            name="name"
            value={editedHousehold?.name}
            onChange={handleInputChange}
          />
        </Form.Group>
        <ListGroup>
          {editedHousehold?.participants?.map((participant, index) => (
            <ListGroup.Item key={index}>
              <Row>
                <Col>
                  <Form.Label>
                    Participant Name: {participant?.name}{" "}
                  </Form.Label>
                </Col>
                <Col>
                  <Button
                    variant="danger"
                    onClick={() => handleRemoveParticipant(index)}
                  >
                    Remove Income
                  </Button>
                </Col>
              </Row>
            </ListGroup.Item>
          ))}
        </ListGroup>

        <Button variant="primary" type="submit">
          Submit
        </Button>
      </Form>
      <Accordion defaultActiveKey={"0"}>
        <Accordion.Item eventKey="0">
          <Accordion.Header>Add a new participant manually</Accordion.Header>
          <Accordion.Body>
            <ParticipantForm
              participant={editedParticipant}
              onSave={handleParticipantSubmit}
            ></ParticipantForm>
          </Accordion.Body>
        </Accordion.Item>
        <Accordion.Item eventKey="1">
          <Accordion.Header>...or select an existing one</Accordion.Header>
          <Accordion.Body>
            <Form.Select
              onChange={handleParticipantSelect}
              aria-label="Default select example"
            >
              <option>Open this select menu</option>
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
    </>
  );
};

export default HouseholdForm;
