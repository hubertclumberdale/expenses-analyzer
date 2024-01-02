import { ExpenseModel } from "@/models/models";
import connectDB from "../lib/connect-db";
import { stringToObjectId } from "../lib/utils";
import { Expense } from '@/types/types'
import { Types } from "mongoose";
interface ExpensesFilter {
  page?: number;
  limit?: number;
}

export async function getExpenses(filter: ExpensesFilter = {}) {
  try {
    await connectDB();

    const page = filter.page ?? 1;
    const limit = filter.limit ?? 10;
    const skip = (page - 1) * limit;

    const expenses = await ExpenseModel.find().skip(skip).limit(limit).lean().exec();

    const results = expenses.length;

    return {
      expenses: expenses,
      page,
      limit,
      results,
    };
  } catch (error) {
    return { error };
  }
}

export async function createExpense(expense: Expense) {
  try {
    await connectDB();

    const created = await ExpenseModel.create({ _id: new Types.ObjectId(), expense });

    return {
      expense: created,
    };
  } catch (error) {
    return { error };
  }
}

export async function getExpense(id: string) {
  try {
    await connectDB();

    const parsedId = stringToObjectId(id);

    if (!parsedId) {
      return { error: "Expense not found" };
    }

    const expense = await ExpenseModel.findById(parsedId).lean().exec();
    if (expense) {
      return {
        expense,
      };
    } else {
      return { error: "Expense not found" };
    }
  } catch (error) {
    return { error };
  }
}

export async function updateExpense(
  expense: Expense
) {
  try {
    await connectDB();


    const found = await ExpenseModel.findByIdAndUpdate(
      expense._id,
      expense,
      { new: true }
    )
      .lean()
      .exec();

    if (found) {
      return {
        expense: found,
      };
    } else {
      return { error: "Expense not found" };
    }
  } catch (error) {
    return { error };
  }
}

export async function deleteExpense(id: string) {
  try {
    await connectDB();

    const parsedId = stringToObjectId(id);

    if (!parsedId) {
      return { error: "Expense not found" };
    }

    const expense = await ExpenseModel.findByIdAndDelete(parsedId).exec();

    if (expense) {
      return {};
    } else {
      return { error: "Expense not found" };
    }
  } catch (error) {
    return { error };
  }
}
