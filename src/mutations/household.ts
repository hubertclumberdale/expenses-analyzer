import connectDB from "@/lib/connect-db";
import { generateHousehold } from "@/lib/household";
import { HouseholdModel } from "@/models/models";
import { Household as IHousehold } from "@/types/types";

export async function createHousehold(household: IHousehold) {
    try {
        await connectDB();
        const householdInstance = await generateHousehold(household)
        await householdInstance.save();
    } catch (error) {
        return { error };
    }
}

export async function getAllHouseholds() {
    try {
        await connectDB();
        const households = await HouseholdModel.find().populate('participants').populate('expenses').lean();
        return households
    } catch (error) {
        console.error(error)

        return []
    }
}