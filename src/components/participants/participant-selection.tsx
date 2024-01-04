import ParticipantForm from "@/components/participants/participant-form";
import { useParticipantsContext } from "@/contexts/participants";
import { Participant } from "@/types/types";
import React from "react";
import { Accordion, Button, Form } from "react-bootstrap";

interface ParticipantSelectionProps {
  participants: Participant[];
  handleParticipantSubmit: (participant: Participant) => void;
  handleParticipantSelect: (
    event: React.ChangeEvent<HTMLSelectElement>
  ) => void;
}

const ParticipantSelection: React.FC<ParticipantSelectionProps> = ({
  participants,
  handleParticipantSubmit,
  handleParticipantSelect,
}) => {
  const { createParticipant } = useParticipantsContext();

  const createEmptyParticipant = async () => {
    const newParticipant = await createParticipant({
      name: "",
      incomes: [],
    });
    handleParticipantSubmit(newParticipant);
  };

  return (
    <Accordion>
      <Accordion.Item eventKey="0">
        <Accordion.Header>Add a new participant manually</Accordion.Header>
        <Accordion.Body>
          <Button onClick={createEmptyParticipant}>Add new participant</Button>
        </Accordion.Body>
      </Accordion.Item>
      <Accordion.Item eventKey="1">
        <Accordion.Header>...or select an existing one</Accordion.Header>
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
  );
};

export default ParticipantSelection;
<hr></hr>;
