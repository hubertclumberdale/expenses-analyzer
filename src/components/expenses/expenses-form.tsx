import React, { useEffect, useState } from "react";
import {
  Button,
  Form,
  ListGroup,
  Row,
  Col,
  Card,
  Container,
} from "react-bootstrap";
import { Expense, Participant, TransactionType } from "@/types/types";

interface ExpensesFormProps {
  expenses: Expense[];
  onSave: (editedExpenses: Expense[]) => void;
}

const ExpensesForm: React.FC<ExpensesFormProps> = ({ expenses, onSave }) => {
  const [editedExpenses, setEditedExpenses] = useState<Expense[]>(expenses);

  useEffect(() => {
    setEditedExpenses(expenses);
  }, [expenses]);

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setEditedExpenses((prevData) => ({
      ...prevData,
      [name]: value,
    }));
  };

  const handleExpenseChange = (index: number, field: string, value: string) => {
    const newExpenses = [...editedExpenses];
    newExpenses[index] = { ...newExpenses[index], [field]: value };
    setEditedExpenses((prevData) => [...newExpenses]);
  };

  const handleAddExpense = () => {
    setEditedExpenses((prevData) => [
      ...prevData,
      {
        amount: 0,
        date: new Date(),
        paid: false,
        transactionId: 0,
        type: TransactionType.EXPENSE,
      },
    ]);
  };

  const handleRemoveExpense = (index: number) => {
    const newExpenses = [...editedExpenses];
    newExpenses.splice(index, 1);
    setEditedExpenses((prevData) => [...newExpenses]);
  };

  const handleSave = () => {
    onSave(editedExpenses);
  };

  return (
    <Form>
      <Card>
        <Card.Header>
          <Card.Title>Expense</Card.Title>
        </Card.Header>
        <Card.Body>
          <Form.Group controlId="formIncomes">
            {!!editedExpenses.length && <Form.Label>Expenses:</Form.Label>}
            <ListGroup>
              {editedExpenses?.map((expense, index) => (
                <ListGroup.Item key={index}>
                  <Row>
                    <Col>
                      <Form.Label>Date:</Form.Label>
                      <Form.Control
                        type="date"
                        value={expense.date?.toISOString?.()?.split("T")[0]}
                        onChange={(e) =>
                          handleExpenseChange(index, "date", e.target.value)
                        }
                      />
                    </Col>
                    <Col>
                      <Form.Label>Amount:</Form.Label>
                      <Form.Control
                        type="number"
                        value={expense.amount}
                        onChange={(e) =>
                          handleExpenseChange(index, "amount", e.target.value)
                        }
                      />
                    </Col>
                    <Col>
                      <Button
                        variant="danger"
                        onClick={() => handleRemoveExpense(index)}
                      >
                        Remove Expense
                      </Button>
                    </Col>
                  </Row>
                </ListGroup.Item>
              ))}
            </ListGroup>
          </Form.Group>
        </Card.Body>
        <Card.Footer>
          <Container>
            <Row className="mt-2">
              <Col>
                <Button variant="secondary" onClick={handleAddExpense}>
                  Add an Expense
                </Button>
              </Col>
              <Col>
                <Button variant="primary" onClick={handleSave}>
                  Save Expenses
                </Button>
              </Col>
            </Row>
          </Container>
        </Card.Footer>
      </Card>
    </Form>
  );
};

export default ExpensesForm;
