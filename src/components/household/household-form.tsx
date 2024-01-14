import ExpensesList from "@/components/expenses/expenses-list";
import ExpensesSelection from "@/components/expenses/expenses-selection";
import ParticipantSelection from "@/components/participants/participant-selection";
import ParticipantList from "@/components/participants/participant-list";
import { Bill, Expense, Household, TransactionType } from "@/types/types";
import React from "react";
import { Accordion, Card, Form } from "react-bootstrap";
import BillList from "@/components/bills/bills-list";
import BillsSelection from "@/components/bills/bills-selection";
import RefundList from "@/components/refunds/refund-list";
import RefundSelection from "@/components/refunds/refund-selection";
import { useHouseholdForm } from "@/components/household/use-household-form";

interface HouseholdFormProps {
  household: Household;
}

const HouseholdForm: React.FC<HouseholdFormProps> = ({ household }) => {
  const {
    editedHousehold,
    updateName,
    addParticipant,
    removeParticipant,
    addBills,
    updateBill,
    removeBill,
    addExpenses,
    updateExpense,
    removeExpense,
    addRefunds,
    updateRefund,
    removeRefund,
  } = useHouseholdForm(household);
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
                onChange={updateName}
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
                    onDelete={removeParticipant}
                  ></ParticipantList>
                  <hr></hr>
                  <h5>Add participants</h5>
                  <ParticipantSelection
                    onParticipantSelect={addParticipant}
                    onParticipantCreation={addParticipant}
                  ></ParticipantSelection>
                  <hr></hr>
                </Accordion.Body>
              </Accordion.Item>
              <Accordion.Item eventKey="1">
                <Accordion.Header>Bills</Accordion.Header>
                <Accordion.Body>
                  <h5>
                    Existing Bills:{" "}
                    {
                      editedHousehold.expenses.filter(
                        (expense) => expense.type === TransactionType.BILL
                      ).length
                    }
                  </h5>
                  <BillList
                    onRemoveBill={removeBill}
                    onUpdateBill={updateBill}
                    bills={
                      editedHousehold?.expenses.filter(
                        (expense) => expense.type === TransactionType.BILL
                      ) as Bill[]
                    }
                  ></BillList>
                  <hr></hr>

                  <h5>Add bills</h5>
                  <BillsSelection handleBillsSubmit={addBills} />
                </Accordion.Body>
              </Accordion.Item>
              <Accordion.Item eventKey="2">
                <Accordion.Header>Expenses</Accordion.Header>
                <Accordion.Body>
                  <h5>
                    Exisiting Expenses:
                    {
                      editedHousehold.expenses.filter(
                        (expense) => expense.type === TransactionType.EXPENSE
                      ).length
                    }
                  </h5>
                  <ExpensesList
                    onRemoveExpense={removeExpense}
                    onUpdateExpense={updateExpense}
                    expenses={
                      editedHousehold?.expenses.filter(
                        (expense) => expense.type === TransactionType.EXPENSE
                      ) as Expense[]
                    }
                  ></ExpensesList>
                  <hr></hr>

                  <h5>Add expenses</h5>
                  <ExpensesSelection handleExpensesSubmit={addExpenses} />
                </Accordion.Body>
              </Accordion.Item>
              <Accordion.Item eventKey="3">
                <Accordion.Header>Refunds</Accordion.Header>
                <Accordion.Body>
                  <h5>Exisiting Refunds: {household.refunds.length}</h5>
                  <RefundList
                    onRemoveRefund={removeRefund}
                    onUpdateRefund={updateRefund}
                    refunds={editedHousehold?.refunds ?? []}
                  ></RefundList>
                  <hr></hr>

                  <h5>Add expenses</h5>
                  <RefundSelection handleRefundsSubmit={addRefunds} />
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
