"use client";

import HouseholdDashboard from "@/components/household/dashboard";
import { useHouseholdContext } from "@/contexts/households";
import { Household, Transaction, TransactionType } from "@/types/types";
import Link from "next/link";
import { useEffect, useState } from "react";
import {
  Breadcrumb,
} from "react-bootstrap";

const Page = ({ params }: { params: { household: string } }) => {
  const { households } = useHouseholdContext();

  const [currentHousehold, setCurrentHousehold] = useState<Household>({
    name: "",
    participants: [],
    expenses: [],
    refunds: [],
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

  

  const generateForecast = async () => {
    const data = currentHousehold.expenses
      .filter((expense) => expense.type === TransactionType.BILL)
      .map((expense) => {
        return {
          date: expense.date,
          amount: expense.amount,
        };
      });
    console.log(data);
  };

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

      <HouseholdDashboard household={currentHousehold}></HouseholdDashboard>

     
    </>
  );
};

export default Page;
