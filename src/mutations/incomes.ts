import { IncomeModel } from "@/models/models";
import connectDB from "../lib/connect-db";
import { stringToObjectId } from "../lib/utils";
import { Income } from '@/types/types'
import { Types } from "mongoose";
interface IncomesFilters {
    page?: number;
    limit?: number;
}

export async function getIncomes(filter: IncomesFilters = {}) {
    try {
        await connectDB();

        const page = filter.page ?? 1;
        const limit = filter.limit ?? 10;
        const skip = (page - 1) * limit;

        const incomes = await IncomeModel.find().skip(skip).limit(limit).lean().exec();

        const results = incomes.length;

        return {
            incomes: incomes,
            page,
            limit,
            results,
        };
    } catch (error) {
        return { error };
    }
}

export async function createIncome(income: Income) {
    try {
        await connectDB();

        const created = await IncomeModel.create({ _id: new Types.ObjectId(), income });
        return {
            income: created,
        };
    } catch (error) {
        console.error(error)
        return { error };
    }
}

export async function getIncome(id: string) {
    try {
        await connectDB();

        const parsedId = stringToObjectId(id);

        if (!parsedId) {
            return { error: "Income not found" };
        }

        const income = await IncomeModel.findById(parsedId).lean().exec();
        if (income) {
            return {
                income,
            };
        } else {
            return { error: "Income not found" };
        }
    } catch (error) {
        return { error };
    }
}

export async function updateIncome(
    income: Income
) {
    try {
        await connectDB();

        const found = await IncomeModel.findByIdAndUpdate(
            income._id,
            income,
            { new: true }
        )
            .lean()
            .exec();

        if (found) {
            return {
                income: found,
            };
        } else {
            return { error: "Income not found" };
        }
    } catch (error) {
        return { error };
    }
}

export async function deleteIncome(id: string) {
    try {
        await connectDB();

        const income = await IncomeModel.findByIdAndDelete(id).exec();

        if (income) {
            return {};
        } else {
            return { error: "Income not found" };
        }
    } catch (error) {
        return { error };
    }
}
