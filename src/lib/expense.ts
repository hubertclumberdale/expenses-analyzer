import { ExpenseModel, IncomeModel } from "@/models/models";
import { Expense } from "@/types/types";
import { Types } from "mongoose";

export const generateExpense = async (expense: Expense) => {
    const expenseInstance = new ExpenseModel({ _id: new Types.ObjectId(), ...expense });
    const saved = expenseInstance.save()
    return await saved;
}

export const addOrUpdateExpenses = async (expenses: Expense[]) => {

    const allExpenses: any = []
    const promises = expenses.map(async (expense) => {

        if (expense._id) {
            await ExpenseModel.findOneAndUpdate(
                { _id: expense._id },
                { $set: { ...expense } },
            );


            allExpenses.push(expense._id)
        } else {

            const newExpense = await new ExpenseModel({ _id: new Types.ObjectId(), ...expense });
            await newExpense.save();
            allExpenses.push(newExpense._id)
        }
    });

    await Promise.all(promises);

    return allExpenses
}