import connectDB from "@/lib/connect-db";
import { addOrUpdateExpenses, persistHousehold } from "@/lib/household";
import { addOrUpdateParticipants } from "@/lib/participant";
import { HouseholdModel } from "@/models/models";
import { Household as IHousehold } from "@/types/types";

export async function createHousehold(household: IHousehold) {
    try {
        await connectDB();
        const householdInstance = await persistHousehold(household)
        await householdInstance.save();
    } catch (error) {
        console.error(error)
        return { error };
    }
}

export async function editHousehold(household: IHousehold) {
    try {

        console.log("household", household)

        const participants = await addOrUpdateParticipants(household.participants)
        const expenses = await addOrUpdateExpenses(household.expenses)
        const newHousehold = await HouseholdModel.findOneAndUpdate(
            { _id: household._id },
            { $set: { ...household, participants: [...participants], expenses: [...expenses] } },
            { new: true }
        );
        console.log("newHousehold", newHousehold)
    } catch (error) {
        console.error(error)
        return { error };
    }

}

export async function getHousehold(id: string) {
    try {
        await connectDB();
        const household = await HouseholdModel.findOne({ _id: id }).populate('participants').populate({
            path: 'participants',
            populate: {
                path: 'incomes'
            }
        }).populate('expenses').lean();
        return household
    } catch (error) {
        console.error(error)

        return {}
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