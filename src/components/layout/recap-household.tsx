import { Household } from "@/types/types";
import { useEffect, useState } from "react";
import { Button, Card, ListGroup } from "react-bootstrap";

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
      <Card style={{ width: "18rem" }}>
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
          <Button variant="primary">View Household</Button>
        </Card.Body>
      </Card>
    </>
  );
};

export default RecapHousehold;
