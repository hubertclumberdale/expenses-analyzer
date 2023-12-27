import { generateIncome } from "@/lib/income";
import { ParticipantModel } from "@/models/models";
import { Participant } from "@/types/types";
import { Types } from "mongoose";

export const generateParticipant = async (participant: Participant) => {
    const savedIncomes = await Promise.all(
        participant.incomes.map(generateIncome)
    );
    const participantWithReferences = {
        ...participant,
        incomes: savedIncomes.map(income => income._id),
    };
    const participantInstance = new ParticipantModel({ _id: new Types.ObjectId(), ...participantWithReferences });
    return await participantInstance.save();
}