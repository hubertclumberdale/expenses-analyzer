import ParticipantForm from "@/components/participants/participant-form";
import { useParticipantsContext } from "@/contexts/participants";
import { Household, Participant } from "@/types/types";
import React, { useState } from "react";
import {
  Accordion,
  Button,
  Col,
  Form,
  InputGroup,
  ListGroup,
  Row,
} from "react-bootstrap";

interface HouseholdFormProps {
  onSubmit: (household: Household) => void;
}

const HouseholdForm: React.FC<HouseholdFormProps> = ({ onSubmit }) => {
  const { participants } = useParticipantsContext();

  const [householdData, setHouseholdData] = useState<Household>({
    name: "",
    participants: [],
    expenses: [],
  });

  const [participant, setParticipant] = useState<Participant>({
    name: "",
    incomes: [],
  });

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    console.log("handleInputChange fired");
    const { name, value } = e.target;
    setHouseholdData((prevData) => ({
      ...prevData,
      [name]: value,
    }));
  };

  const handleSubmit = (e: React.FormEvent) => {
    console.log("handleSubmit fired");

    e.preventDefault();
    onSubmit(householdData);
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
    setHouseholdData((prevData) => {
      return {
        ...prevData,
        participants: [...prevData.participants, newParticipant],
      };
    });
  };

  const handleParticipantSubmit = (submittedParticipant: Participant) => {
    addParticipant(submittedParticipant);
  };

  const handleRemoveParticipant = (index: number) => {
    const newParticipants = [...householdData.participants];
    newParticipants.splice(index, 1);
    setHouseholdData((prevData) => ({
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
            value={householdData.name}
            onChange={handleInputChange}
          />
        </Form.Group>
        <ListGroup>
          {householdData.participants.map((participant, index) => (
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
              participant={participant}
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
