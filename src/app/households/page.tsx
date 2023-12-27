"use client";
import HouseholdForm from "@/components/household/household-form";
import RecapHousehold from "@/components/household/recap";
import { useHouseholdContext } from "@/contexts/households";
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
