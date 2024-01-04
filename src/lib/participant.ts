import { updateIncomes } from "@/lib/income";
import { ParticipantModel } from "@/models/models";
import { Participant } from "@/types/types";
import { Types } from "mongoose";

export const addOrUpdateParticipants = async (participants: Participant[]) => {

    const allParticipants: any = []
    const promises = participants.map(async (participant) => {
        (participant)
        if (participant._id) {
            updateParticipant(participant)
            allParticipants.push(participant._id)
        } else {

            const newParticipant = await persistParticipant(participant)
            allParticipants.push(newParticipant._id)
        }
    });

    await Promise.all(promises);

    return allParticipants
}

export const persistParticipant = async (participant: Participant) => {
    const newParticipant = await new ParticipantModel({ _id: new Types.ObjectId(), ...participant, incomes: [] });
    await newParticipant.save();
    participant.incomes.forEach(income => {
        income.owner = newParticipant._id.toString()
    })
    const incomes = await updateIncomes(participant.incomes)
    await ParticipantModel.findOneAndUpdate(
        { _id: newParticipant._id },
        { $set: { ...participant, incomes: incomes } },
    );
    return newParticipant
}

export const updateParticipant = async (participant: Participant) => {
    const incomes = participant.incomes.map(income => income._id)
    await ParticipantModel.findOneAndUpdate(
        { _id: participant._id },
        { $set: { ...participant, incomes } },
    );
}