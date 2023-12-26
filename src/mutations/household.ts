import connectDB from "@/lib/connect-db";
import { ExpenseModel, HouseholdModel, IncomeModel, ParticipantModel } from "@/models/models";
import { Household as IHousehold } from "@/types/types";
import { Types } from "mongoose";

export async function createHousehold(household: IHousehold) {
    try {
        await connectDB();

        const savedIncomes = await Promise.all(
            household.participants.flatMap((participant) =>
                participant.incomes.map(async (income) => {
                    const incomeInstance = new IncomeModel({ _id: new Types.ObjectId(), ...income });
                    return await incomeInstance.save();
                })
            )
        );

        const savedExpenses = await Promise.all(
            household.expenses.flatMap(async (expense) => {
                const incomeInstance = new ExpenseModel({ _id: new Types.ObjectId(), ...expense });
                return await incomeInstance.save();
            })
        );

        const savedParticipants = await Promise.all(
            household.participants.map(async (participant, index) => {
                const participantWithReferences = {
                    ...participant,
                    incomes: savedIncomes.slice(index * participant.incomes.length, (index + 1) * participant.incomes.length).map((income) => income._id),
                };
                const participantInstance = new ParticipantModel({ _id: new Types.ObjectId(), ...participantWithReferences });
                return await participantInstance.save();
            })
        );

        const householdWithReferences = {
            ...household,
            participants: savedParticipants.map((participant) => participant._id),
            expenses: savedExpenses.map((expense) => expense._id)
        };

        const householdInstance = new HouseholdModel({ _id: new Types.ObjectId(), ...householdWithReferences });
        const createdHousehold = await householdInstance.save();

        return {
            household: createdHousehold,
        };
    } catch (error) {
        console.log(error);
        return { error };
    }
}

export async function getAllHouseholds() {
    try {
        await connectDB();

        const households = await HouseholdModel.find().populate('participants').lean();
        return households
    } catch (error) {
        console.log(error);
        return []
    }
}