import ExpensesList from "@/components/expenses/expenses-list";
import ExpensesSelection from "@/components/expenses/expenses-selection";
import ParticipantSelection from "@/components/participants/participant-selection";
import ParticipantList from "@/components/participants/participant-list";
import { useParticipantsContext } from "@/contexts/participants";
import { Bill, Expense, Household, Participant } from "@/types/types";
import React, { useEffect, useState } from "react";
import { Accordion, Card, Form } from "react-bootstrap";
import { useHouseholdContext } from "@/contexts/households";
import { debounce } from "lodash";
import { useExpensesContext } from "@/contexts/expenses";
import BillList from "@/components/bills/bills-list";
import BillsSelection from "@/components/bills/bills-selection";
import { useBillsContext } from "@/contexts/bills";

interface HouseholdFormProps {
  household: Household;
}

const HouseholdForm: React.FC<HouseholdFormProps> = ({ household }) => {
  const { editHousehold, refreshHouseholds } = useHouseholdContext();

  const { participants } = useParticipantsContext();

  const { createExpense } = useExpensesContext();

  const { createBill } = useBillsContext();

  const [editedHousehold, setEditedHousehold] = useState<Household>({
    name: "",
    participants: [],
    expenses: [],
  });

  const [editedParticipant] = useState<Participant>({
    name: "",
    incomes: [],
  });

  useEffect(() => {
    setEditedHousehold(household);
  }, [household]);

  useEffect(() => {
    const debouncedEditHousehold = debounce(() => {
      editHousehold(editedHousehold);
    }, 300);

    debouncedEditHousehold();

    return () => {
      debouncedEditHousehold.cancel();
    };
  }, [
    editedHousehold.name,
    editedHousehold.participants.length,
    editedHousehold.expenses.length,
  ]);

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setEditedHousehold((prevData) => ({
      ...prevData,
      [name]: value,
    }));
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
    setEditedHousehold((prevData) => {
      return {
        ...prevData,
        participants: [...(prevData?.participants ?? []), newParticipant],
      };
    });
  };

  const handleParticipantSubmit = (submittedParticipant: Participant) => {
    addParticipant(submittedParticipant);
  };

  const handleExpensesSubmit = (expenses: Expense[]) => {
    expenses.forEach(async (expense) => {
      const newExpense = await createExpense(expense);
      if (newExpense?._id) {
        expenses.forEach((expense) => addExpense(expense));
      }
    });
  };

  const handleBillsSubmit = (bills: Bill[]) => {
    bills.forEach(async (bill) => {
      const newBill = await createBill(bill);
      if (newBill?._id) {
        bills.forEach((bill) => addBill(bill));
      }
    });
  };

  const addBill = (newBill: Bill) => {
    setEditedHousehold((prevData) => {
      return {
        ...prevData,
        expenses: [...(prevData?.expenses ?? []), newBill],
      };
    });
  };

  const addExpense = (newExpense: Expense) => {
    setEditedHousehold((prevData) => {
      return {
        ...prevData,
        expenses: [...(prevData?.expenses ?? []), newExpense],
      };
    });
  };

  const handleRemoveExpense = (id: string) => {
    setEditedHousehold((prevData) => ({
      ...prevData,
      expenses: prevData.expenses.filter((expense) => expense._id !== id),
    }));
  };

  const handleRemoveBill = (id: string) => {
    setEditedHousehold((prevData) => ({
      ...prevData,
      expenses: prevData.expenses.filter((expense) => expense._id !== id),
    }));
  };

  const handleUpdateBill = (bill: Bill) => {
    setEditedHousehold((prevData) => {
      const newExpenses = [...prevData.expenses];
      const index = newExpenses.findIndex(
        (prevExpense) => prevExpense._id === bill._id
      );
      newExpenses[index] = bill;
      return {
        ...prevData,
        expenses: newExpenses,
      };
    });
  };

  const debouncedDeleteParticipant = debounce((index: number) => {
    const newParticipants = [...editedHousehold.participants];
    newParticipants.splice(index, 1);
    setEditedHousehold((prevData) => ({
      ...prevData,
      participants: newParticipants,
    }));
  }, 500);

  const handleDeleteParticipant = ({ index }: { index: number }) => {
    debouncedDeleteParticipant(index);
  };

  const handleUpdateExpense = (expense: Expense) => {
    setEditedHousehold((prevData) => {
      const newExpenses = [...prevData.expenses];
      const index = newExpenses.findIndex(
        (prevExpense) => prevExpense._id === expense._id
      );
      newExpenses[index] = expense;
      return {
        ...prevData,
        expenses: newExpenses,
      };
    });
  };

  return (
    <>
      <Form>
        <Card>
          <Card.Header>Household</Card.Header>
          <Card.Body>
            <Form.Group controlId="formHouseholdName">
              <h5>Household Name:</h5>
              <Form.Control
                type="text"
                name="name"
                value={editedHousehold?.name}
                onChange={handleInputChange}
              />
            </Form.Group>
            <hr></hr>
            <Accordion>
              <Accordion.Item eventKey="0">
                <Accordion.Header>Participants</Accordion.Header>
                <Accordion.Body>
                  <h5>Existing Participants:</h5>
                  <ParticipantList
                    participants={editedHousehold?.participants}
                    onDelete={handleDeleteParticipant}
                  ></ParticipantList>
                  <hr></hr>
                  <h5>Add participants</h5>
                  <ParticipantSelection
                    editedParticipant={editedParticipant}
                    handleParticipantSelect={handleParticipantSelect}
                    handleParticipantSubmit={handleParticipantSubmit}
                    participants={participants}
                  ></ParticipantSelection>
                  <hr></hr>
                </Accordion.Body>
              </Accordion.Item>
              <Accordion.Item eventKey="1">
                <Accordion.Header>Bills</Accordion.Header>
                <Accordion.Body>
                  <h5>Exisiting Bills:</h5>
                  <BillList
                    onRemoveBill={handleRemoveBill}
                    onUpdateBill={handleUpdateBill}
                    bills={
                      editedHousehold?.expenses.filter(
                        (expense) => expense.type === "bill"
                      ) as Bill[]
                    }
                  ></BillList>
                  <hr></hr>

                  <h5>Add expenses</h5>
                  <ExpensesSelection
                    handleExpensesSubmit={handleExpensesSubmit}
                  />
                </Accordion.Body>
              </Accordion.Item>
              <Accordion.Item eventKey="2">
                <Accordion.Header>Expenses</Accordion.Header>
                <Accordion.Body>
                  <h5>Exisiting Expenses:</h5>
                  <ExpensesList
                    onRemoveExpense={handleRemoveExpense}
                    onUpdateExpense={handleUpdateExpense}
                    expenses={
                      editedHousehold?.expenses.filter(
                        (expense) => expense.type === "expense"
                      ) as Expense[]
                    }
                  ></ExpensesList>
                  <hr></hr>

                  <h5>Add bills</h5>
                  <BillsSelection handleBillsSubmit={handleBillsSubmit} />
                </Accordion.Body>
              </Accordion.Item>
            </Accordion>
          </Card.Body>
        </Card>
      </Form>
    </>
  );
};

export default HouseholdForm;
