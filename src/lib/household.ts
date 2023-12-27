import { generateExpense } from "@/lib/expense";
import { generateParticipant } from "@/lib/participant";
import { HouseholdModel } from "@/models/models";
import { Household } from "@/types/types";
import { Types } from "mongoose";

export const generateHousehold = async (household: Household) => {

    const savedExpenses = await Promise.all(
        household.expenses.map(generateExpense)
    );

    const savedParticipants = await Promise.all(
        household.participants.map(generateParticipant)
    );

    const householdWithReferences = {
        ...household,
        participants: savedParticipants.map((participant) => participant._id),
        expenses: savedExpenses.map((expense) => expense._id)
    };

    const householdInstance = new HouseholdModel({ _id: new Types.ObjectId(), ...householdWithReferences });
    return householdInstance
}