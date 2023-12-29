"use client";

import HouseholdForm from "@/components/household/household-form";
import { useHouseholdContext } from "@/contexts/households";
import { Household } from "@/types/types";
import Link from "next/link";
import { useEffect, useState } from "react";
import { Breadcrumb } from "react-bootstrap";

const Page = ({ params }: { params: { household: string } }) => {
  const { households, editHousehold } = useHouseholdContext();

  const [currentHousehold, setCurrentHousehold] = useState<Household>({
    name: "",
    participants: [],
    expenses: [],
  });

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

  return (
    <>
      <Breadcrumb>
        <Breadcrumb.Item>
          <Link href="/">Home</Link>
        </Breadcrumb.Item>
        <Breadcrumb.Item>
          <Link href="/households">Households</Link>
        </Breadcrumb.Item>
        <Breadcrumb.Item>
          <Link href={`/households/${currentHousehold._id}`}>
            {<>{currentHousehold._id}</>}
          </Link>
        </Breadcrumb.Item>
        <Breadcrumb.Item active>Edit</Breadcrumb.Item>
      </Breadcrumb>
      <h1>Editing Household: {currentHousehold.name}</h1>
      <h4>Household id: {currentHousehold._id?.toString()}</h4>
      <hr></hr>
      <HouseholdForm
        household={currentHousehold}
        onSubmit={editHousehold}
      ></HouseholdForm>
    </>
  );
};

export default Page;
