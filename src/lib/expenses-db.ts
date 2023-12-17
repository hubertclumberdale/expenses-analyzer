import { Expense } from "@/models/Expense";
import connectDB from "./connect-db";
import { stringToObjectId } from "./utils";

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

    const expenses = await Expense.find().skip(skip).limit(limit).lean().exec();

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

export async function createExpense(title: string) {
  try {
    await connectDB();

    const expense = await Expense.create({ title });

    return {
      expense,
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

    const expense = await Expense.findById(parsedId).lean().exec();
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
  id: string,
  { title, completed }: { title?: string; completed?: boolean }
) {
  try {
    await connectDB();

    const parsedId = stringToObjectId(id);

    if (!parsedId) {
      return { error: "Expense not found" };
    }

    const expense = await Expense.findByIdAndUpdate(
      parsedId,
      { title, completed },
      { new: true }
    )
      .lean()
      .exec();

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

export async function deleteExpense(id: string) {
  try {
    await connectDB();

    const parsedId = stringToObjectId(id);

    if (!parsedId) {
      return { error: "Expense not found" };
    }

    const expense = await Expense.findByIdAndDelete(parsedId).exec();

    if (expense) {
      return {};
    } else {
      return { error: "Expense not found" };
    }
  } catch (error) {
    return { error };
  }
}
