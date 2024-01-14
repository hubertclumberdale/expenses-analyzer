import { BillModel } from "@/models/models";
import connectDB from "../lib/connect-db";
import { Transaction } from '@/types/types'
import { Types } from "mongoose";
interface BillsFilter {
    page?: number;
    limit?: number;
}

export async function getBills(filter: BillsFilter = {}) {
    try {
        await connectDB();

        const page = filter.page ?? 1;
        const limit = filter.limit ?? 10;
        const skip = (page - 1) * limit;

        const bills = await BillModel.find().skip(skip).limit(limit).lean().exec();

        const results = bills.length;

        return {
            bills,
            page,
            limit,
            results,
        };
    } catch (error) {
        return { error };
    }
}

export async function createBill(transaction: Transaction) {
    try {
        await connectDB();

        const created = await BillModel.create({ _id: new Types.ObjectId(), ...transaction });

        return {
            created,
        };
    } catch (error) {
        console.error(error)
        return { error };
    }
}

export async function getBill(id: string) {
    try {
        await connectDB();

        const bill = await BillModel.findById(id).lean().exec();
        if (bill) {
            return {
                bill,
            };
        } else {
            return { error: "Expense not found" };
        }
    } catch (error) {
        return { error };
    }
}

export async function updateBill(
    transaction: Transaction
) {
    try {
        await connectDB();


        const found = await BillModel.findByIdAndUpdate(
            transaction._id,
            transaction,
            { new: true }
        )
            .lean()
            .exec();

        if (found) {
            return {
                bill: found,
            };
        } else {
            return { error: "Bill not found" };
        }
    } catch (error) {
        return { error };
    }
}

export async function deleteBill(id: string) {
    try {
        await connectDB();


        const bill = await BillModel.findByIdAndDelete(id).exec();

        if (bill) {
            return {};
        } else {
            return { error: "Bill not found" };
        }
    } catch (error) {
        return { error };
    }
}
