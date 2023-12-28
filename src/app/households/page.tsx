"use client";
import HouseholdForm from "@/components/household/household-form";
import RecapHousehold from "@/components/household/recap";
import { useHouseholdContext } from "@/contexts/households";
import { Household } from "@/types/types";
import Link from "next/link";
import { useState } from "react";
import { Breadcrumb, Button, Col, Container, Row } from "react-bootstrap";

const Page = () => {
  const { loading, households, createHousehold, removeAllHouseholds } =
    useHouseholdContext();

  const [household] = useState<Household>({
    name: "",
    participants: [],
    expenses: [],
  });

  return (
    <>
      <Container>
        <Breadcrumb>
          <Breadcrumb.Item>
            <Link href="/">Home</Link>
          </Breadcrumb.Item>
          <Breadcrumb.Item active>Households</Breadcrumb.Item>
        </Breadcrumb>

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
            <HouseholdForm
              household={household}
              onSubmit={createHousehold}
            ></HouseholdForm>
          </Col>
        </Row>
        <hr></hr>
        <Row className="mt-5">
          <Button onClick={removeAllHouseholds} variant="danger">
            Remove all Households
          </Button>
        </Row>
      </Container>
    </>
  );
};

export default Page;
