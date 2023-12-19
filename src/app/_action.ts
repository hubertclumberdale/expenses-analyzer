"use server";

import chatGPTClient from "@/lib/chatgpt-client";
import { createExpense, deleteExpense, updateExpense } from "@/lib/expenses-db";
import { extractContentFromFile } from "@/lib/utils";
import { Expense } from "@/types/Expenses";
import { revalidatePath } from "next/cache";
const pdf = require('pdf-parse');

export async function createExpenseAction({
  expense,
  path,
}: {
  expense: Expense;
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
    expense: Expense,
    path: string
  }
) {
  await updateExpense(expense);
  revalidatePath(path);
}

export async function deleteExpenseAction({
  expense,
  path,
}: {
  expense: Expense;
  path: string;
}) {
  if (expense.id) {
    await deleteExpense(expense.id);
  }
  revalidatePath(path);
}

export async function uploadExpenseAction(data: FormData) {
  const files: File[] | null = data.getAll('files') as unknown as File[]
  if (!files) {
    throw new Error('No files uploaded')
  }

  let parentMessageId: string | undefined = undefined
  try {
    const expensesPromises = files.map(async (file: File) => {
      return new Promise<Expense>(async (resolve) => {
        try {
          const bytes = await file.arrayBuffer();
          const buffer = Buffer.from(bytes);
          const result = await pdf(buffer, { max: 1 });
          const firstPage = result?.text;

          const extractedInterface = extractContentFromFile('src/types/Expenses.ts')

          const prompt = `I need you to extract the following information in a JSON with this schema:
        
                        ${extractedInterface}
    
                        from this text: ${firstPage}`;

          const sanitizedPrompt = prompt.replace('\n', '').replace(' ', '').replace(/\n/g, '');

          const response = await chatGPTClient.sendMessage({
            prompt: sanitizedPrompt,
            parentMessageId,
          });
          parentMessageId = response.parentMessageId
          const expense = response.text;
          const parsedExpense = JSON.parse(expense)
          resolve(parsedExpense);
        } catch (error) {
          console.error('Error processing file:', error);
          resolve({} as Expense);
        }
      });
    });

    const expenses = await Promise.all(expensesPromises);
    const filteredExpenses = expenses.filter((expense) => expense !== null);
    return ({ success: true, expenses: filteredExpenses })

  } catch (error: any) {
    if (typeof error === "string" && error.includes("Expense not found")) {
      return {
        status: 'error',
        message: 'Expense not found'
      }
    }

    return {
      status: 'error',
      message: 'Internal server error'
    }
  }
}