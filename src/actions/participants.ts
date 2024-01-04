"use server"

import { createParticipant, deleteParticipant, editParticipant, getAllParticipants, removeAllParticipants } from "@/mutations/participants";
import { Participant } from "@/types/types";

export async function createParticipantAction(participant: Participant) {
    const newParticipant = await createParticipant(participant)
    return JSON.parse(JSON.stringify(newParticipant))
}

export async function editParticipantAction(participant: Participant) {
    await editParticipant(participant)
}

export async function getAllParticipantsAction() {
    const households = await getAllParticipants()
    return JSON.parse(JSON.stringify(households))
}

export async function deleteParticipantAction(participant: Participant) {
    await deleteParticipant(participant)
}

export async function removeAllParticipantsAction() {
    await removeAllParticipants()
}