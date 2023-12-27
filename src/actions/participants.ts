"use server"

import { createParticipant, getAllParticipants, removeAllParticipants } from "@/mutations/participants";
import { Participant } from "@/types/types";
import { revalidatePath } from "next/cache";

export async function createParticipantAction(participant: Participant) {
    await createParticipant(participant)
    revalidatePath('/dashboard');

}

export async function getAllParticipantsAction() {
    const households = await getAllParticipants()
    return JSON.parse(JSON.stringify(households))
}

export async function removeAllParticipantsAction() {
    await removeAllParticipants()
}