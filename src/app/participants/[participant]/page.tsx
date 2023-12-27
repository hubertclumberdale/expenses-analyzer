"use client";

import EditParticipant from "@/components/participants/edit-participant";
import { useParticipantsContext } from "@/contexts/participants";
import { Participant } from "@/types/types";
import { useEffect, useState } from "react";

const Page = ({ params }: { params: { participant: string } }) => {
  const { participants, createParticipant } = useParticipantsContext();

  const [currentParticipant, setCurrentParticipant] = useState<Participant>({
    name: "",
    incomes: [],
  });

  useEffect(() => {
    const participant = participants.find(
      (participant) => participant._id === params.participant
    );

    if (participant) {
      setCurrentParticipant(participant);
    }
  }, []);
  return (
    <>
      <h1>Editing participant: {currentParticipant.name}</h1>

      <EditParticipant
        participant={currentParticipant}
        onSave={createParticipant}
      ></EditParticipant>
    </>
  );
};

export default Page;
