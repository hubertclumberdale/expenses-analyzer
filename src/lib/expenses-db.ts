import { ExpenseModel } from "@/models/models";
import connectDB from "./connect-db";
import { stringToObjectId } from "./utils";
import { Expense as IExpense } from '@/types/types'
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

export async function createExpense(expense: IExpense) {
  try {
    await connectDB();

    const created = await ExpenseModel.create(expense);

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
  expense: IExpense
) {
  try {
    await connectDB();

    const parsedId = stringToObjectId(expense?.id ?? '');

    if (!parsedId) {
      return { error: "Expense not found" };
    }

    const found = await ExpenseModel.findByIdAndUpdate(
      parsedId,
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
