"use server";

import { createExpense, deleteExpense, updateExpense } from "@/lib/expenses-db";
import { revalidatePath } from "next/cache";

export async function createExpenseAction({
  title,
  path,
}: {
  title: string;
  path: string;
}) {
  await createExpense(title);
  revalidatePath(path);
}

export async function updateExpenseAction(
  id: string,
  update: { tilte?: string; completed?: boolean },
  path: string
) {
  await updateExpense(id, update);
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
