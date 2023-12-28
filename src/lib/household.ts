import { addOrUpdateExpenses } from "@/lib/expense";
import { addOrUpdateParticipants } from "@/lib/participant";
import { HouseholdModel } from "@/models/models";
import { Household } from "@/types/types";
import { Types } from "mongoose";

export const generateHousehold = async (household: Household) => {
    console.log(household)
    let savedExpenses: any[] = []
    if (household?.expenses) {
        savedExpenses = [...await addOrUpdateExpenses(household.expenses)]

    }

    let savedParticipants: any[] = []
    if (household?.participants) {
        savedParticipants = [...await addOrUpdateParticipants(household.participants)]
    }

    const householdWithReferences = {
        ...household,
        participants: savedParticipants,
        expenses: savedExpenses
    };



    const householdInstance = new HouseholdModel({ _id: new Types.ObjectId(), ...householdWithReferences });
    return householdInstance
}