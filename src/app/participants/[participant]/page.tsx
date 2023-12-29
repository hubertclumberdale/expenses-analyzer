"use client";

import ParticipantForm from "@/components/participants/participant-form";
import { useParticipantsContext } from "@/contexts/participants";
import { Participant } from "@/types/types";
import Link from "next/link";
import { useEffect, useState } from "react";
import { Breadcrumb } from "react-bootstrap";

const Page = ({ params }: { params: { participant: string } }) => {
  const { participants, editParticipant } = useParticipantsContext();

  const [currentParticipant, setCurrentParticipant] = useState<Participant>({
    name: "",
    incomes: [],
  });

  const findAndSetCurrentParticipant = () => {
    const participant = participants.find(
      (participant) => participant._id === params.participant
    );

    if (participant) {
      setCurrentParticipant(participant);
    }
  };

  useEffect(() => {
    findAndSetCurrentParticipant();
  }, []);

  useEffect(() => {
    findAndSetCurrentParticipant();
  }, [participants]);

  return (
    <>
      <Breadcrumb>
        <Breadcrumb.Item active>
          <Link href="/">Home</Link>
        </Breadcrumb.Item>
        <Breadcrumb.Item active>
          <Link href="/participants">Participants</Link>
        </Breadcrumb.Item>
        <Breadcrumb.Item active>Edit</Breadcrumb.Item>
      </Breadcrumb>
      <h1>Editing participant: {currentParticipant.name}</h1>
      <h4>participant id: {currentParticipant._id?.toString()}</h4>

      <ParticipantForm
        participant={currentParticipant}
        onSave={editParticipant}
      ></ParticipantForm>
    </>
  );
};

export default Page;
