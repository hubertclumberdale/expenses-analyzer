import ParticipantDropdown from "@/components/participants/participant-dropdown";
import ParticipantForm from "@/components/participants/participant-form";
import { useParticipantsContext } from "@/contexts/participants";
import { Participant } from "@/types/types";
import React from "react";
import { Accordion, Button, Form } from "react-bootstrap";

interface ParticipantSelectionProps {
  onParticipantCreation: (participant: Participant) => void;
  onParticipantSelect: (participant: Participant) => void;
}

const ParticipantSelection: React.FC<ParticipantSelectionProps> = ({
  onParticipantCreation,
  onParticipantSelect,
}) => {
  const { createParticipant, participants } = useParticipantsContext();

  const createEmptyParticipant = async () => {
    const newParticipant = await createParticipant({
      name: "",
      incomes: [],
    });
    onParticipantCreation(newParticipant);
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
          <ParticipantDropdown
            onParticipantSelect={onParticipantSelect}
          ></ParticipantDropdown>
        </Accordion.Body>
      </Accordion.Item>
    </Accordion>
  );
};

export default ParticipantSelection;
<hr></hr>;
