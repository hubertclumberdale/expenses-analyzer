import React, { useState, useEffect } from "react";
import RecapMeter from "@/components/layout/recap-meters/recap-meter";
import { useExpensesContext } from "@/contexts/expenses-context";
import { Button, Col, Container, Row } from "react-bootstrap";
import {
  createHouseholdAction,
  getAllHouseholdsAction,
} from "@/actions/household";
import { Household } from "@/types/types";
import RecapHousehold from "@/components/layout/recap-household";

const Dashboard = () => {
  const { expenses } = useExpensesContext();

  const [expensesData, setExpensesData] = useState({
    monthlyEarnings: 0,
    annualEarnings: 0,
    totalExpenses: 0,
    monthlyExpenses: 0,
  });

  const [households, setHouseholds] = useState<Household[]>([]);
  const [loadingHouseholds, setLoadingHouseholds] = useState(false);
  const [errorHouseholds, setErrorHouseholds] = useState<string | null>(null);

  useEffect(() => {
    const monthlyEarnings = expenses.reduce(
      (acc, expense) => acc + expense.amount,
      0
    );
    const annualEarnings = 0;
    const totalExpenses = expenses.length;
    const monthlyExpenses = 0;

    setExpensesData({
      monthlyEarnings,
      annualEarnings,
      totalExpenses,
      monthlyExpenses,
    });
  }, [expenses]);

  const createHousehold = async () => {
    const household: Household = {
      name: "fugoini",
      expenses: [
        {
          amount: 100,
          date: new Date(),
          dueDate: new Date(),
          fromDate: new Date(),
          paid: false,
          provider: "gas",
          toDate: new Date(),
          transactionId: 12345,
          type: "expense",
        },
      ],
      participants: [
        {
          name: "Umberto",
          incomes: [
            {
              amount: 1000,
              date: new Date(),
              paid: true,
              transactionId: 12345,
              type: "income",
            },
          ],
        },
      ],
    };

    await createHouseholdAction(JSON.parse(JSON.stringify(household)));
    await getAllHouseholds();
  };

  const getAllHouseholds = async () => {
    try {
      setLoadingHouseholds(true);
      setErrorHouseholds(null);

      const allHouseholds = await getAllHouseholdsAction();
      setHouseholds(allHouseholds as Household[]);
    } catch (error) {
      console.error("Error fetching households:", error);
      setErrorHouseholds("Error fetching households. Please try again.");
    } finally {
      setLoadingHouseholds(false);
    }
  };
  return (
    <>
      <Container className="mx-auto max-w-md p-4">
        <Row>
          <Col>
            <Button onClick={createHousehold}>Create new Household</Button>
          </Col>
          <Col>
            <Button onClick={getAllHouseholds}>Get all Households</Button>
          </Col>
          <Col></Col>
        </Row>
        <Row>
          <Col>
            {loadingHouseholds && <p>Loading households...</p>}
            {errorHouseholds && <p>Error: {errorHouseholds}</p>}
            {households.map((household, index) => (
              <RecapHousehold
                key={index}
                household={household}
              ></RecapHousehold>
            ))}
          </Col>
        </Row>
        <Row>
          <RecapMeter
            title="EARNINGS (MONTHLY)"
            description={`$${expensesData.monthlyEarnings}`}
            variant="primary"
          ></RecapMeter>
          <RecapMeter
            title="EARNINGS (ANNUAL)"
            description={`$${expensesData.annualEarnings}`}
            variant="success"
          ></RecapMeter>
          <RecapMeter
            title="Number of Expenses"
            description={expensesData.totalExpenses}
            variant="info"
          ></RecapMeter>
          <RecapMeter
            title="EXPENSES (MONTHLY)"
            description={expensesData.monthlyExpenses}
            variant="warning"
          ></RecapMeter>
          <RecapMeter
            title="EXPENSES (YEARLY)"
            description={expensesData.annualEarnings}
            variant="warning"
          ></RecapMeter>
        </Row>
      </Container>
    </>
  );
};

export default Dashboard;
