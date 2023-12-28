import connectDB from "@/lib/connect-db";
import { generateHousehold } from "@/lib/household";
import { addOrUpdateParticipants } from "@/lib/participant";
import { HouseholdModel } from "@/models/models";
import { Household as IHousehold } from "@/types/types";

export async function createHousehold(household: IHousehold) {
    try {
        await connectDB();
        const householdInstance = await generateHousehold(household)
        await householdInstance.save();
    } catch (error) {
        console.error(error)
        return { error };
    }
}

export async function editHousehold(household: IHousehold) {

    try {
        console.log(household.participants.map(participant => participant.incomes))

        const participants = await addOrUpdateParticipants(household.participants)
        const expenses = []

        await HouseholdModel.findOneAndUpdate(
            { _id: household._id },
            { $set: { ...household, participants: [...participants], expenses: [...expenses] } },
            { new: true }
        );
    } catch (error) {
        console.error(error)
        return { error };
    }


}

export async function getAllHouseholds() {
    try {
        await connectDB();
        const households = await HouseholdModel.find().populate({
            path: 'participants',
            populate: {
                path: 'incomes'
            }
        }).populate('expenses').lean();
        return households
    } catch (error) {
        console.error(error)

        return []
    }
}

export async function removeAllHouseholds() {
    try {
        await connectDB();
        await HouseholdModel.deleteMany()
    } catch (error) {
        console.error(error)
    }
}