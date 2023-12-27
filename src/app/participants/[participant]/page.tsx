"use client";

import ParticipantForm from "@/components/participants/participant-form";
import { useParticipantsContext } from "@/contexts/participants";
import { Participant } from "@/types/types";
import { useEffect, useState } from "react";

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
