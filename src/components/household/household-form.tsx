import ExpensesList from "@/components/expenses/expenses-list";
import ExpensesSelection from "@/components/expenses/expenses-selection";
import ParticipantSelection from "@/components/participants/participant-selection";
import ParticipantList from "@/components/participants/participant-list";
import { useParticipantsContext } from "@/contexts/participants";
import { Bill, Expense, Household, Participant } from "@/types/types";
import React, { useEffect, useState } from "react";
import { Accordion, Button, Card, Form } from "react-bootstrap";
import BillList from "@/components/bills/bills-list";
import BillsSelection from "@/components/bills/bills-selection";
import { useHouseholdContext } from "@/contexts/households";
import { debounce } from "lodash";
import { useTransactionsContext } from "@/contexts/transactions";

interface HouseholdFormProps {
  household: Household;
}

const HouseholdForm: React.FC<HouseholdFormProps> = ({ household }) => {
  const [initialized, setInitialized] = useState<boolean>(false);
  const { participants } = useParticipantsContext();
  const { editHousehold, getAllHouseholdsTest } = useHouseholdContext();

  const { updateTransaction, createTransaction } = useTransactionsContext();
  const [editedHousehold, setEditedHousehold] = useState<Household>({
    name: "",
    participants: [],
    expenses: [],
  });

  useEffect(() => {
    if (!initialized && household._id) {
      setEditedHousehold(household);
      setInitialized(true);
    }
  }, [household]);

  useEffect(() => {
    if (!initialized) {
      return;
    }
    debouncedEditHousehold();

    return () => {
      debouncedEditHousehold.cancel();
    };
  }, [
    editedHousehold.name,
    editedHousehold.participants.length,
    editedHousehold.expenses.length,
  ]);

  const debouncedEditHousehold = debounce(() => {
    saveHousehold();
  }, 300);

  const saveHousehold = () => {
    if (!editedHousehold._id) {
      return;
    }
    editHousehold(editedHousehold);
  };

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    console.log("handleInputChange");
    const { name, value } = e.target;
    setEditedHousehold((prev) => ({
      ...prev,
      [name]: value,
    }));
    debouncedEditHousehold();
  };

  const handleDeleteParticipant = ({ index }: { index: number }) => {
    console.log("handleDeleteParticipant");
    const newParticipants = [...editedHousehold.participants];
    newParticipants.splice(index, 1);
    setEditedHousehold((prev) => ({
      ...prev,
      participants: newParticipants,
    }));
  };

  const handleParticipantSelect = (e: React.ChangeEvent<HTMLSelectElement>) => {
    console.log("handleParticipantSelect");
    const participant = participants.find(
      (participant) => participant._id?.toString() === e.target.value
    );
    if (participant) {
      setEditedHousehold((prev) => ({
        ...prev,
        participants: [...prev.participants, participant],
      }));
    }
  };

  const handleParticipantSubmit = (participant: Participant) => {
    console.log("handleParticipantSubmit");
    setEditedHousehold((prev) => ({
      ...prev,
      participants: [...prev.participants, participant],
    }));
  };

  const handleUpdateBill = (bill: Bill) => {
    console.log("handleUpdateBill");
    updateTransaction(bill);
  };

  const handleRemoveBill = (id: string) => {
    console.log("handleRemoveBill");
    setEditedHousehold((prev) => ({
      ...prev,
      expenses: prev.expenses.filter((expense) => expense._id !== id),
    }));
  };

  const handleBillsSubmit = async (bills: Bill[]) => {
    console.log("handleBillsSubmit");
    const createdBills: Bill[] = [];
    for (const bill of bills) {
      const createdBill = await createTransaction(bill);
      if (createdBill?._id) {
        createdBills.push(createdBill as Bill);
      }
    }
    setEditedHousehold((prev) => ({
      ...prev,
      expenses: [...prev.expenses, ...createdBills],
    }));
  };

  const handleRemoveExpense = (id: string) => {
    console.log("handleRemoveExpense");
    setEditedHousehold((prev) => ({
      ...prev,
      expenses: prev.expenses.filter((expense) => expense._id !== id),
    }));
  };

  const handleUpdateExpense = (expense: Expense) => {
    console.log("handleUpdateExpense");
    updateTransaction(expense);
  };

  const handleExpensesSubmit = (expenses: Expense[]) => {
    console.log("handleExpensesSubmit");
    setEditedHousehold((prev) => ({
      ...prev,
      expenses: [...prev.expenses, ...expenses],
    }));
  };

  const logAllHouseholds = async () => {
    const allHouseholds = await getAllHouseholdsTest();
    console.log("allHouseholds", allHouseholds);
  };

  return (
    <>
      <div>
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
              <Button onClick={logAllHouseholds}>test</Button>
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
                    participants={participants}
                    handleParticipantSelect={handleParticipantSelect}
                    handleParticipantSubmit={handleParticipantSubmit}
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

                  <h5>Add bills</h5>
                  <BillsSelection handleBillsSubmit={handleBillsSubmit} />
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

                  <h5>Add expenses</h5>
                  <ExpensesSelection
                    handleExpensesSubmit={handleExpensesSubmit}
                  />
                </Accordion.Body>
              </Accordion.Item>
            </Accordion>
          </Card.Body>
        </Card>
      </div>
    </>
  );
};

export default HouseholdForm;
