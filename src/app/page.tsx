"use client";
import { createAnalysisAction } from "@/actions/analysis";
import { Analysis } from "@/types/types";
import { Button, Col, Container, Row } from "react-bootstrap";

const Page = () => {
  const createAnalysis = () => {
    const analysis: Analysis = {
      households: [],
      name: "Umbertos Analysis",
      owner: {
        name: "Umberto",
        incomes: [
          {
            amount: 1234,
            date: new Date(),
            paid: true,
            type: "income",
            transactionId: 123456,
          },
        ],
      },
    };
    createAnalysisAction({ analysis: JSON.parse(JSON.stringify(analysis)) });
  };
  return (
    <>
      <Container>
        <Row>
          <Col>
            <Button onClick={createAnalysis}>Create new analysis</Button>
          </Col>
        </Row>
      </Container>
    </>
  );
};

export default Page;
