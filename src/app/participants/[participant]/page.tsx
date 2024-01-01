"use client";

import ParticipantForm from "@/components/participants/participant-form";
import { useParticipantsContext } from "@/contexts/participants";
import Link from "next/link";
import { Breadcrumb } from "react-bootstrap";

const Page = ({ params }: { params: { participant: string } }) => {
  const { refreshParticipants } = useParticipantsContext();
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

      <ParticipantForm
        participantId={params.participant}
        onSave={refreshParticipants}
      ></ParticipantForm>
    </>
  );
};

export default Page;
