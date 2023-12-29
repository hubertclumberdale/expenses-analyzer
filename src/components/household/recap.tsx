import { Household } from "@/types/types";
import Link from "next/link";
import { useEffect, useState } from "react";
import { Button, Card, Col, Container, ListGroup, Row } from "react-bootstrap";

const RecapHousehold = ({ household }: { household: Household }) => {
  const [householdData, setHouseholdData] = useState({
    numberOfExpenses: 0,
    totalExpenses: 0,
    numberOfParticipants: 0,
  });

  useEffect(() => {
    const numberOfExpenses = household.expenses.length;
    const totalExpenses = household.expenses.reduce(
      (acc, expense) => acc + expense.amount,
      0
    );

    const numberOfParticipants = household.participants.length;

    setHouseholdData({
      numberOfExpenses,
      totalExpenses,
      numberOfParticipants,
    });
  }, [household]);

  return (
    <>
      <Card>
        <Card.Body>
          <Card.Title>{household.name}</Card.Title>
        </Card.Body>
        <ListGroup variant="flush">
          <ListGroup.Item>
            Total Expenses: {householdData.numberOfExpenses}
          </ListGroup.Item>
          <ListGroup.Item>
            Number of Participants: {householdData.numberOfParticipants}
          </ListGroup.Item>
        </ListGroup>
        <Card.Body>
          <Container>
            <Row>
              <Col>
                <Link href={`/households/${household._id}/edit`}>
                  <Button variant="warning">Edit Household</Button>
                </Link>
              </Col>
              <Col>
                <Link href={`/households/${household._id}/`}>
                  <Button variant="primary">View Household</Button>
                </Link>
              </Col>
            </Row>
          </Container>
        </Card.Body>
      </Card>
    </>
  );
};

export default RecapHousehold;
