"use client";

import EditParticipant from "@/components/participants/edit-participant";
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

      <EditParticipant
        participant={currentParticipant}
        onSave={editParticipant}
      ></EditParticipant>
    </>
  );
};

export default Page;
