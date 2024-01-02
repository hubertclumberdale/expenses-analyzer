import React, { useEffect, useState } from "react";
import { Form, ListGroup, Card, Row, Col } from "react-bootstrap";
import { Income, Participant } from "@/types/types";
import IncomeList from "@/components/incomes/income-list";
import { useParticipantsContext } from "@/contexts/participants";
import IncomesSelection from "@/components/incomes/incomes-selection";
import { useIncomesContext } from "@/contexts/incomes";

interface ParticipantFormProps {
  participantId?: string;
  onSave: (participant: Participant) => void;
}

const ParticipantForm: React.FC<ParticipantFormProps> = ({
  participantId,
  onSave,
}) => {
  const {
    participants,
    createParticipant,
    editParticipant,
    refreshParticipants,
  } = useParticipantsContext();

  const { createIncome } = useIncomesContext();

  const [participant, setParticipant] = useState<Participant>({
    incomes: [],
    name: "",
  });

  const findAndSetCurrentParticipant = () => {
    const participant = participants.find(
      (participant) => participant._id === participantId
    );

    if (participant) {
      setParticipant(participant);
    }
  };

  useEffect(() => {
    if (participantId) {
      findAndSetCurrentParticipant();
    }
  }, [participantId, participants]);

  const handleInputChange = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    await setParticipant((prevData) => ({
      ...prevData,
      [name]: value,
    }));
  };

  const saveParticipant = async () => {
    if (participant._id) {
      await editParticipant(participant);
    } else {
      await createParticipant(participant);
    }
    onSave(participant);
  };

  const addIncomeToParticipant = async (incomes: Income[]) => {
    const updatedIncomes: Income[] = [];
    for (const income of incomes) {
      const newIncome = await createIncome(income);
      if (newIncome?._id) {
        updatedIncomes.push(newIncome);
      }
    }

    setParticipant((prevData) => ({
      ...prevData,
      incomes: [...prevData.incomes, ...updatedIncomes],
    }));
  };

  const removeIncomeFromParticipant = async (id: string) => {
    await setParticipant((prevData) => ({
      ...prevData,
      incomes: prevData.incomes.filter((income) => income._id !== id),
    }));
  };

  useEffect(() => {
    if (participant.incomes.length) {
      saveParticipant();
    }
  }, [participant.incomes.length]);

  return (
    <>
      {participant?._id && (
        <>
          <h1>Editing participant: {participant.name}</h1>
          <h4>participant id: {participant._id?.toString()}</h4>
        </>
      )}
      <Form>
        <Card>
          <Card.Header>
            <Card.Title>Participant</Card.Title>
          </Card.Header>
          <Card.Body>
            <Form.Group controlId="formParticipantName">
              <Form.Label>Participant Name:</Form.Label>
              <Form.Control
                type="text"
                name="name"
                value={participant.name}
                onChange={handleInputChange}
              />
            </Form.Group>
            <hr></hr>
            <Form.Group controlId="formIncomes">
              <ListGroup>
                <Row className="mb-4">
                  <Col>
                    <h4>Incomes:</h4>
                  </Col>
                  <Col>
                    <IncomesSelection
                      handleIncomesSubmit={addIncomeToParticipant}
                    ></IncomesSelection>
                  </Col>
                </Row>
                <IncomeList
                  incomes={participant.incomes}
                  onRemoveIncome={removeIncomeFromParticipant}
                  onUpdateIncome={refreshParticipants}
                ></IncomeList>
              </ListGroup>
            </Form.Group>
          </Card.Body>
        </Card>
      </Form>
    </>
  );
};

export default ParticipantForm;
