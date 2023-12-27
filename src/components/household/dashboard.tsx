"use client";
import React, { useState, useEffect } from "react";
import RecapMeter from "@/components/layout/recap-meters/recap-meter";
import { Container, Row } from "react-bootstrap";
import { useHouseholdContext } from "@/contexts/households";
import { Household } from "@/types/types";

const HouseholdDashboard = ({ householdId }: { householdId: string }) => {
  const [household, setHousehold] = useState<Household>();

  const { households } = useHouseholdContext();

  const [expensesData, setExpensesData] = useState({
    monthlyEarnings: 0,
    annualEarnings: 0,
    totalExpenses: 0,
    monthlyExpenses: 0,
  });

  useEffect(() => {
    const monthlyEarnings =
      household?.expenses.reduce((acc, expense) => acc + expense.amount, 0) ??
      0;
    const annualEarnings = 0;
    const totalExpenses = household?.expenses.length ?? 0;
    const monthlyExpenses = 0;

    setExpensesData({
      monthlyEarnings,
      annualEarnings,
      totalExpenses,
      monthlyExpenses,
    });
  }, [household]);

  useEffect(() => {
    if (households.length) {
      console.log("households are set");
      const currentHousehold = households.find(
        (household) => household._id === householdId
      );
      setHousehold(currentHousehold);
    }
  }, [households.length]);

  return (
    <>
      <Container className="mx-auto max-w-md p-4">
        <Row>
          <h1>{household?.name}</h1>
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

export default HouseholdDashboard;
