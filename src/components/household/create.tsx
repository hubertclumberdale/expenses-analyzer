import { Household } from "@/types/types";
import React, { useState } from "react";
import { Button, Form, InputGroup } from "react-bootstrap";

interface HouseholdFormProps {
  onSubmit: (household: Household) => void;
}

const HouseholdForm: React.FC<HouseholdFormProps> = ({ onSubmit }) => {
  const [householdData, setHouseholdData] = useState<Household>({
    name: "",
    participants: [],
    expenses: [],
  });

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setHouseholdData((prevData) => ({
      ...prevData,
      [name]: value,
    }));
  };

  const handleParticipantChange = (
    index: number,
    field: string,
    value: string
  ) => {
    setHouseholdData((prevData) => {
      const newParticipants = [...prevData.participants];
      newParticipants[index] = { ...newParticipants[index], [field]: value };
      return { ...prevData, participants: newParticipants };
    });
  };

  const handleAddParticipant = () => {
    setHouseholdData((prevData) => ({
      ...prevData,
      participants: [...prevData.participants, { name: "", incomes: [] }],
    }));
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    onSubmit(householdData);
  };

  return (
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

      <Form.Group controlId="formParticipants">
        <Form.Label>Participants:</Form.Label>
        <ul>
          {householdData.participants.map((participant, index) => (
            <li key={index}>
              <Form.Group controlId={`formParticipantName${index}`}>
                <Form.Label>Participant Name:</Form.Label>
                <InputGroup>
                  <Form.Control
                    type="text"
                    value={participant.name}
                    onChange={(e) =>
                      handleParticipantChange(index, "name", e.target.value)
                    }
                  />
                </InputGroup>
              </Form.Group>
            </li>
          ))}
        </ul>
        <Button
          variant="secondary"
          type="button"
          onClick={handleAddParticipant}
        >
          Add Participant
        </Button>
      </Form.Group>

      <Button variant="primary" type="submit">
        Submit
      </Button>
    </Form>
  );
};

export default HouseholdForm;
