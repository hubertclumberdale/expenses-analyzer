import { IncomeModel } from "@/models/models";
import { Income } from "@/types/types";
import { Types } from "mongoose";

export const generateIncome = async (income: Income) => {
    const incomeInstance = new IncomeModel({ _id: new Types.ObjectId(), ...income });
    return await incomeInstance.save();
}