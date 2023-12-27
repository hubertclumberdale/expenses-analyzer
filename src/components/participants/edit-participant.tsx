import React, { useState } from "react";
import { Button, Form } from "react-bootstrap";
import { Participant } from "@/types/types"; // Import your Participant type

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

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setEditedParticipant((prevData) => ({
      ...prevData,
      [name]: value,
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
      {/* Add other fields as needed */}
      <Button variant="primary" onClick={handleSave}>
        Save Changes
      </Button>
    </Form>
  );
};

export default EditParticipant;
