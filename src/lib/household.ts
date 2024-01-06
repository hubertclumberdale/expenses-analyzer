import { addOrUpdateParticipants } from "@/lib/participant";
import { HouseholdModel } from "@/models/models";
import { createTransaction, updateTransaction } from "@/mutations/transactions";
import { Household, Transaction } from "@/types/types";
import { Types } from "mongoose";

export const persistHousehold = async (household: Household) => {
    let savedExpenses: any[] = []
    if (household?.expenses) {
        savedExpenses = [...await addOrUpdateExpenses(household.expenses)]

    }

    let savedRefunds: any[] = []
    if (household?.refunds) {
        savedRefunds = [...await addOrUpdateExpenses(household.refunds)]
    }

    let savedParticipants: any[] = []
    if (household?.participants) {
        savedParticipants = [...await addOrUpdateParticipants(household.participants)]
    }

    const householdWithReferences = {
        ...household,
        participants: savedParticipants,
        expenses: savedExpenses,
        refunds: savedRefunds
    };



    const householdInstance = new HouseholdModel({ _id: new Types.ObjectId(), ...householdWithReferences });
    return householdInstance
}


export const addOrUpdateExpenses = async (transactions: Transaction[]) => {

    const allTransactions: any = []
    const promises = transactions.map(async (transaction) => {

        if (transaction._id) {
            await updateTransaction(transaction)
            allTransactions.push(transaction._id)
        } else {
            const { created } = await createTransaction(transaction)
            allTransactions.push(created?._id)
        }
    });

    await Promise.all(promises);

    return allTransactions
}