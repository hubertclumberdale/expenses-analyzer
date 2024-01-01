"use client";
import HouseholdList from "@/components/household/household-list";
import { useHouseholdContext } from "@/contexts/households";
import Link from "next/link";
import { Breadcrumb, Button, Container, Row } from "react-bootstrap";

const Page = () => {
  const { households, removeAllHouseholds, createHousehold } =
    useHouseholdContext();

  const createEmptyHousehold = () => {
    const household = {
      name: "",
      participants: [],
      expenses: [],
    };
    createHousehold(household);
  };

  return (
    <>
      <Container>
        <Breadcrumb>
          <Breadcrumb.Item active>
            <Link href="/">Home</Link>
          </Breadcrumb.Item>
          <Breadcrumb.Item active>Households</Breadcrumb.Item>
        </Breadcrumb>
        <Row className="my-3">
          <h4>Existing Households</h4>
          <Button onClick={createEmptyHousehold}>Add a new Household</Button>
          <HouseholdList households={households}></HouseholdList>
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
