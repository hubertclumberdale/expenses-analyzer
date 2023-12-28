import { IncomeModel } from "@/models/models";
import { Income } from "@/types/types";
import { Types } from "mongoose";

export const generateIncome = async (income: Income) => {
    const incomeInstance = new IncomeModel({ _id: new Types.ObjectId(), ...income });
    return await incomeInstance.save();
}

export const updateIncomes = async (incomes: Income[]) => {
    const allIncomes: any = []

    const promises = incomes.map(async (income) => {
        if (income._id) {
            await IncomeModel.findOneAndUpdate(
                { _id: income._id },
                { $set: income },
            );
            allIncomes.push(income._id)
        } else {
            const newIncome = await new IncomeModel({ _id: new Types.ObjectId(), ...income });
            await newIncome.save();
            allIncomes.push(newIncome._id)
        }
    });

    await Promise.all(promises);
    return allIncomes
}