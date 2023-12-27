import ParticipantForm from "@/components/participants/participant-form";
import { useParticipantsContext } from "@/contexts/participants";
import { Income, Participant } from "@/types/types";
import Link from "next/link";
import { useState } from "react";
import { Button, Card, Col, Container, ListGroup, Row } from "react-bootstrap";

const Dashboard = () => {
  const { participants, loading, createParticipant } = useParticipantsContext();

  const [participant, setParticipant] = useState<Participant>({
    name: "",
    incomes: [],
  });

  const getTotalIncome = (incomes: Income[]) => {
    return incomes.reduce((total, income) => total + income.amount, 0);
  };
  return (
    <>
      <Container>
        <h1>Participants</h1>
        <Row className="my-3">{loading && <p>Loading participants...</p>}</Row>
        <Row>
          {participants.map((participant, index) => (
            <Col key={index} xs={6} className="mt-4">
              <Card>
                <Card.Body>
                  <Card.Title>{participant.name}</Card.Title>
                </Card.Body>
                <ListGroup variant="flush">
                  <ListGroup.Item>
                    Total income: € {getTotalIncome(participant.incomes)}
                  </ListGroup.Item>
                  <ListGroup.Item>
                    Number of incomes: {participant.incomes.length}
                  </ListGroup.Item>
                </ListGroup>
                <Card.Body>
                  <Link href={`/participants/${participant._id}`}>
                    <Button>Explore participant</Button>
                  </Link>
                </Card.Body>
              </Card>
            </Col>
          ))}
        </Row>
        <hr></hr>
        <h3>Add a new Participant</h3>
        <Row>
          <ParticipantForm
            participant={participant}
            onSave={createParticipant}
          ></ParticipantForm>
        </Row>
      </Container>
    </>
  );
};

export default Dashboard;
