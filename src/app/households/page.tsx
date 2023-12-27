"use client";
import HouseholdForm from "@/components/household/create";
import RecapHousehold from "@/components/household/recap";
import { HouseholdsProvider, useHouseholdContext } from "@/contexts/households";
import { useEffect } from "react";
import { Button, Col, Container, Row } from "react-bootstrap";

const Page = () => {
  const { loading, households, createHousehold, removeAllHouseholds } =
    useHouseholdContext();

  return (
    <>
      <Container>
        <h1>Households</h1>

        <Row className="my-3">
          {loading && <p>Loading households...</p>}
          {households.map((household, index) => (
            <Col key={index} xs={6} className="mt-3">
              <RecapHousehold household={household}></RecapHousehold>
            </Col>
          ))}
        </Row>
        <Row>
          <Col>
            <HouseholdForm onSubmit={createHousehold}></HouseholdForm>
          </Col>
          <Col>
            <Button onClick={removeAllHouseholds} variant="danger">
              Remove all Households
            </Button>
          </Col>
        </Row>
      </Container>
    </>
  );
};

export default Page;
