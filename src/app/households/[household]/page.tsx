"use client";

import BarChart from "@/components/charts/BarChart";
import LineChart from "@/components/charts/LineChart";
import PieChart from "@/components/charts/PieChart";
import { useHouseholdContext } from "@/contexts/households";
import { Household, Transaction } from "@/types/types";
import Link from "next/link";
import { useEffect, useState } from "react";
import {
  Accordion,
  Breadcrumb,
  Button,
  Card,
  Col,
  Container,
  Row,
} from "react-bootstrap";

const Page = ({ params }: { params: { household: string } }) => {
  const { households } = useHouseholdContext();

  const [currentHousehold, setCurrentHousehold] = useState<Household>({
    name: "",
    participants: [],
    expenses: [],
    refunds: [],
  });

  const [transactions, setTransactions] = useState<Transaction[]>([]);

  const findAndSetCurrentParticipant = () => {
    const household = households.find(
      (participant) => participant._id === params.household
    );

    if (household) {
      setCurrentHousehold(household);
    }
  };

  useEffect(() => {
    findAndSetCurrentParticipant();
  }, []);

  useEffect(() => {
    findAndSetCurrentParticipant();
  }, [households]);

  useEffect(() => {
    if (!currentHousehold._id) {
      return;
    }

    const transactions = [
      ...currentHousehold.expenses,
      ...currentHousehold.refunds,
    ];
    setTransactions(transactions);
  }, [
    currentHousehold,
    currentHousehold.expenses.length,
    currentHousehold.refunds.length,
  ]);

  return (
    <>
      <Breadcrumb>
        <Breadcrumb.Item active>
          <Link href="/">Home</Link>
        </Breadcrumb.Item>
        <Breadcrumb.Item active>
          <Link href="/households">Households</Link>
        </Breadcrumb.Item>
        <Breadcrumb.Item active>{<>{currentHousehold._id}</>}</Breadcrumb.Item>
      </Breadcrumb>

      <Card>
        <Card.Header>
          <Card.Title>
            <h1>Household: {currentHousehold.name}</h1>
            <h4>Household id: {currentHousehold._id?.toString()}</h4>
            <Link href={`/households/${currentHousehold._id}/edit`}>
              <Button variant="warning">Edit Household</Button>
            </Link>
          </Card.Title>
        </Card.Header>
        <Card.Body>
          <Accordion activeKey="0">
            <Accordion.Item eventKey="0">
              <Accordion.Header>Expenses</Accordion.Header>
              <Accordion.Body>
                <Container>
                  <Row>
                    <Col>
                      <BarChart
                        transactions={currentHousehold.expenses}
                        dataKey="amount"
                      ></BarChart>
                    </Col>
                    <Col>
                      <LineChart
                        transactions={currentHousehold.expenses}
                        dataKey="amount"
                      ></LineChart>
                    </Col>
                    <Col>
                      <PieChart transactions={transactions}></PieChart>
                    </Col>
                  </Row>
                </Container>
              </Accordion.Body>
            </Accordion.Item>
          </Accordion>
        </Card.Body>
      </Card>
    </>
  );
};

export default Page;
