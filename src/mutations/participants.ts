import connectDB from "@/lib/connect-db";
import { addOrUpdateParticipants } from "@/lib/participant";
import { ParticipantModel, } from "@/models/models";
import { Participant as IParticipant } from "@/types/types";

export async function createParticipant(participant: IParticipant) {
    try {
        await connectDB();
        await addOrUpdateParticipants([participant])

    } catch (error) {
        console.error(error)
        return { error };
    }
}

export async function editParticipant(participant: IParticipant) {

    try {
        await connectDB();
        await addOrUpdateParticipants([participant])

    } catch (error) {
        console.error(error)
        return { error };
    }
}

export async function getAllParticipants() {
    try {
        await connectDB();
        const participants = await ParticipantModel.find().populate('incomes').lean();
        return participants
    } catch (error) {
        console.error(error)

        return []
    }
}

export async function removeAllParticipants() {
    try {
        await connectDB();
        await ParticipantModel.deleteMany()
    } catch (error) {
        console.error(error)
    }
}