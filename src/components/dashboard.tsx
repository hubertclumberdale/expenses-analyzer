import React, { useState, useEffect } from "react";
import RecapMeter from "@/components/layout/recap-meters/recap-meter";
import { useExpensesContext } from "@/contexts/expenses-context";
import { Container, Row } from "react-bootstrap";

const Dashboard = () => {
  const { expenses } = useExpensesContext();

  // State to track expenses data
  const [expensesData, setExpensesData] = useState({
    monthlyEarnings: 0,
    annualEarnings: 0,
    totalExpenses: 0,
    monthlyExpenses: 0,
  });

  useEffect(() => {
    // Calculate values based on the expenses array
    const monthlyEarnings = expenses.reduce(
      (acc, expense) => acc + expense.amount,
      0
    );
    const annualEarnings = 0;
    const totalExpenses = expenses.length;
    const monthlyExpenses = 0;

    // Update the state with the calculated values
    setExpensesData({
      monthlyEarnings,
      annualEarnings,
      totalExpenses,
      monthlyExpenses,
    });
  }, [expenses]);

  return (
    <>
      <Container className="mx-auto max-w-md p-4">
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
