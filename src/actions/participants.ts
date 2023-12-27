"use server"

import { createParticipant, editParticipant, getAllParticipants, removeAllParticipants } from "@/mutations/participants";
import { Participant } from "@/types/types";
import { revalidatePath } from "next/cache";

export async function createParticipantAction(participant: Participant) {
    console.log(participant)
    await createParticipant(participant)
    revalidatePath('/participants');
}

export async function editParticipantAction(participant: Participant) {
    await editParticipant(participant)
    revalidatePath('/participants');
}

export async function getAllParticipantsAction() {
    const households = await getAllParticipants()
    return JSON.parse(JSON.stringify(households))
}

export async function removeAllParticipantsAction() {
    await removeAllParticipants()
}