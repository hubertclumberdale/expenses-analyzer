import { Expense, ExpenseClass } from "@/models/Expense";
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

export async function createExpense(expense: ExpenseClass) {
  try {
    await connectDB();

    const created = await Expense.create(expense);
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
  expense: ExpenseClass
) {
  try {
    await connectDB();

    const parsedId = stringToObjectId(expense?.id ?? '');

    if (!parsedId) {
      return { error: "Expense not found" };
    }

    const found = await Expense.findByIdAndUpdate(
      parsedId,
      expense,
      { new: true }
    )
      .lean()
      .exec();

    if (found) {
      return {
        found,
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
