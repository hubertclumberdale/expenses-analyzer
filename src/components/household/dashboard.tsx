"use client";
import React, { useState, useEffect } from "react";
import RecapMeter from "@/components/layout/recap-meters/recap-meter";
import { Container, Row } from "react-bootstrap";
import { Bill, Household, Transaction, TransactionType } from "@/types/types";
import { Accordion, Button, Card, Col } from "react-bootstrap";
import LineChart from "@/components/charts/LineChart";
import PieChart from "@/components/charts/PieChart";
import Link from "next/link";
import MultipleLineChart from "@/components/charts/MultipleLineChart";
import RadarChart from "@/components/charts/RadarChart";
const HouseholdDashboard = ({ household }: { household: Household }) => {
  const [transactions, setTransactions] = useState<Transaction[]>([]);

  const [expensesData, setExpensesData] = useState({
    numberOfExpenses: 0,
    annualExpenses: 0,
    numberOfYears: 0,
    monthlyExpenses: 0,
  });

  const calculateNumberOfYears = () => {
    const earliestExpense = Math.min(
      ...household.expenses.map((expense) => new Date(expense.date).getTime())
    );
    const farthestExpense = Math.max(
      ...household.expenses.map((expense) => new Date(expense.date).getTime())
    );

    const startDate = new Date(earliestExpense);
    const endDate = new Date(farthestExpense);

    const diffInMilliseconds = Math.abs(
      endDate.getTime() - startDate.getTime()
    );
    const diffInYears = diffInMilliseconds / (1000 * 60 * 60 * 24 * 365);

    return diffInYears;
  };

  useEffect(() => {
    const numberOfExpenses = household?.expenses.length ?? 0;

    const annualExpenses = household?.expenses
      .filter((expense) => expense.type === TransactionType.BILL)
      .reduce((acc, expense) => acc + expense.amount, 0);

    const monthlyExpenses =
      household?.expenses
        .filter((expense) => expense.type === TransactionType.BILL)
        .reduce((acc, expense) => acc + expense.amount, 0) / 12 || 0;

    const numberOfYears = calculateNumberOfYears();

    setExpensesData({
      numberOfExpenses,
      annualExpenses,
      numberOfYears,
      monthlyExpenses,
    });
  }, [household]);
  useEffect(() => {
    if (!household._id) {
      return;
    }

    const transactions = [...household.expenses, ...household.refunds];
    setTransactions(transactions);
  }, [household.expenses.length, household.refunds.length]);
  return (
    <>
      <Container className="mx-auto max-w-md p-4">
        <Card>
          <Card.Header>
            <Card.Title>
              <h1>Household: {household.name}</h1>
              <h4>Household id: {household._id?.toString()}</h4>
              <Link href={`/households/${household._id}/edit`}>
                <Button variant="warning">Edit Household</Button>
              </Link>
            </Card.Title>
          </Card.Header>
          <Card.Body>
            <Row>
              <RecapMeter
                title="Number of Expenses"
                description={expensesData.numberOfExpenses}
                variant="primary"
              ></RecapMeter>
              <RecapMeter
                title="EXPENSES (MONTHLY)"
                description={`€ ${expensesData.monthlyExpenses}`}
                variant="primary"
              ></RecapMeter>
              <RecapMeter
                title="EXPENSES (YEARLY)"
                description={`€ ${expensesData.annualExpenses}`}
                variant="primary"
              ></RecapMeter>

              <RecapMeter
                title="Number of years"
                description={`${expensesData.numberOfYears.toFixed(2)} years`}
                variant="primary"
              ></RecapMeter>
            </Row>
            <Accordion activeKey="0">
              <Accordion.Item eventKey="0">
                <Accordion.Header>Expenses</Accordion.Header>
                <Accordion.Body>
                  <Container>
                    <Row>
                      <Col>
                        <h2>Expenses per participant</h2>
                        <PieChart transactions={transactions}></PieChart>
                      </Col>
                      <Col>
                        <h2>Radar Chart</h2>
                        <RadarChart transactions={household.expenses} />
                      </Col>
                    </Row>
                    <hr></hr>
                    <Row>
                      <Col>
                        <h2>All Expenses: {household.expenses.length}</h2>
                        <LineChart
                          transactions={household.expenses}
                          dataKey="amount"
                        ></LineChart>
                      </Col>
                    </Row>
                    <hr></hr>
                    <Row>
                      <Col>
                        <h2>Gas</h2>
                        <MultipleLineChart
                          lines={[
                            {
                              name: "Amount",
                              dataKey: "amount",
                              data: household.expenses
                                .filter(
                                  (expense) =>
                                    expense.type === TransactionType.BILL
                                )
                                .filter(
                                  (expense) =>
                                    (expense as Bill).provider === "gas"
                                ),
                              stroke: "#4e73df",
                              type: "monotone",
                            },
                            {
                              name: "Consumption in SMC",
                              dataKey: "consumption",
                              data: household.expenses
                                .filter(
                                  (expense) =>
                                    expense.type === TransactionType.BILL
                                )
                                .filter(
                                  (expense) =>
                                    (expense as Bill).provider === "gas"
                                ),
                              stroke: "#82ca9d",
                              type: "monotone",
                            },
                          ]}
                        />
                      </Col>
                    </Row>
                    <hr></hr>
                    <Row>
                      <Col>
                        <h2>Electricity</h2>
                        <MultipleLineChart
                          lines={[
                            {
                              name: "Amount",
                              dataKey: "amount",
                              data: household.expenses
                                .filter(
                                  (expense) =>
                                    expense.type === TransactionType.BILL
                                )
                                .filter(
                                  (expense) =>
                                    (expense as Bill).provider === "electricity"
                                ),
                              stroke: "#4e73df",
                              type: "monotone",
                            },
                            {
                              name: "Consumption in KWh",
                              dataKey: "consumption",
                              data: household.expenses
                                .filter(
                                  (expense) =>
                                    expense.type === TransactionType.BILL
                                )
                                .filter(
                                  (expense) =>
                                    (expense as Bill).provider === "electricity"
                                ),
                              stroke: "#82ca9d",
                              type: "monotone",
                            },
                          ]}
                        />
                      </Col>
                    </Row>
                    <hr></hr>
                    <Row>
                      <Col>
                        <h2>Gas & Electricity - Amounts</h2>
                        <MultipleLineChart
                          lines={[
                            {
                              name: "Gas",
                              dataKey: "amount",
                              data: household.expenses
                                .filter(
                                  (expense) =>
                                    expense.type === TransactionType.BILL
                                )
                                .filter(
                                  (expense) =>
                                    (expense as Bill).provider === "gas"
                                ),
                              stroke: "#4e73df",
                              type: "monotone",
                            },
                            {
                              name: "Electricity",
                              dataKey: "amount",
                              data: household.expenses
                                .filter(
                                  (expense) =>
                                    expense.type === TransactionType.BILL
                                )
                                .filter(
                                  (expense) =>
                                    (expense as Bill).provider === "electricity"
                                ),
                              stroke: "#82ca9d",
                              type: "monotone",
                            },
                          ]}
                        ></MultipleLineChart>
                      </Col>
                    </Row>
                  </Container>
                </Accordion.Body>
              </Accordion.Item>
            </Accordion>
          </Card.Body>
        </Card>
      </Container>
    </>
  );
};

export default HouseholdDashboard;
