import connectDB from "@/lib/connect-db";
import { generateParticipant } from "@/lib/participant";
import { IncomeModel, ParticipantModel, } from "@/models/models";
import { Participant as IParticipant } from "@/types/types";
import { Types } from "mongoose";

export async function createParticipant(participant: IParticipant) {
    try {
        await connectDB();
        const participantInstance = await generateParticipant(participant)
        await participantInstance.save();
    } catch (error) {
        console.error(error)
        return { error };
    }
}

export async function editParticipant(participant: IParticipant) {

    try {
        await connectDB();


        console.log("updated participant")


        const allIncomes: any = []

        // Update modified incomes and add new incomes
        const promises = participant.incomes.map(async (income) => {
            if (income._id) {
                // If income has an ID, it's an existing income that needs to be updated
                await IncomeModel.findOneAndUpdate(
                    { _id: income._id },
                    { $set: income },
                );
                allIncomes.push(income._id)
            } else {
                console.log("New income")

                // If income doesn't have an ID, it's a new income that needs to be added
                const newIncome = await new IncomeModel({ _id: new Types.ObjectId(), ...income });
                await newIncome.save();
                allIncomes.push(newIncome._id)
            }
        });

        await Promise.all(promises);
        console.log(allIncomes)
        await ParticipantModel.findOneAndUpdate(
            { _id: participant._id },
            { $set: { ...participant, incomes: [...allIncomes] } },
            { new: true }
        );



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