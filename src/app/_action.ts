"use server";

import { createExpense, deleteExpense, updateExpense } from "@/lib/expenses-db";
import { ExpenseClass } from "@/models/Expense";
import { revalidatePath } from "next/cache";

export async function createExpenseAction({
  expense,
  path,
}: {
  expense: ExpenseClass;
  path: string;
}) {
  await createExpense(expense);
  revalidatePath(path);
}

export async function updateExpenseAction(
  {
    expense,
    path
  }: {
    expense: ExpenseClass,
    path: string
  }
) {
  await updateExpense(expense);
  revalidatePath(path);
}

export async function deleteExpenseAction({
  id,
  path,
}: {
  id: string;
  path: string;
}) {
  await deleteExpense(id);
  revalidatePath(path);
}