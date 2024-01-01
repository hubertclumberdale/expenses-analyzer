"use server"

import { createParticipant, deleteParticipant, editParticipant, getAllParticipants, removeAllParticipants } from "@/mutations/participants";
import { Participant } from "@/types/types";
import { revalidatePath } from "next/cache";

export async function createParticipantAction(participant: Participant) {
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

export async function deleteParticipantAction(participant: Participant) {
    await deleteParticipant(participant)
    revalidatePath('/participants');
}

export async function removeAllParticipantsAction() {
    await removeAllParticipants()
}