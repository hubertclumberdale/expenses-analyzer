import { ExpenseModel, IncomeModel } from "@/models/models";
import { Expense } from "@/types/types";
import { Types } from "mongoose";

export const generateExpense = async (expense: Expense) => {
    const expenseInstance = new ExpenseModel({ _id: new Types.ObjectId(), ...expense });
    const saved = expenseInstance.save()
    return await saved;
}