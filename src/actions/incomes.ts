"use server";

import { Income } from "@/types/types";
import { createIncome, deleteIncome, getIncomes, updateIncome } from "@/mutations/incomes";
import { extractContentFromFile } from "@/lib/utils";
import chatGPTClient from "@/lib/chatgpt-client";
const pdf = require('pdf-parse');

export async function getIncomesAction() {
    const incomes = await getIncomes()
    return JSON.parse(JSON.stringify(incomes))
}

export async function createIncomeAction({
    income,
    path,
}: {
    income: Income;
    path: string;
}) {
    const { created } = await createIncome(income);
    return JSON.parse(JSON.stringify(created))
}

export async function updateIncomeAction(
    {
        income,
        path
    }: {
        income: Income,
        path: string
    }
) {
    await updateIncome(income);
}

export async function deleteIncomeAction({
    income,
}: {
    income: Income;
}) {
    if (income._id) {
        await deleteIncome(income._id.toString());
    }
}


export async function extractPaycheckAction(data: FormData) {
    const files: File[] | null = data.getAll('files') as unknown as File[]
    if (!files) {
        throw new Error('No files uploaded')
    }

    let parentMessageId: string | undefined = undefined
    try {
        const incomesPromises = files.map(async (file: File) => {
            return new Promise<Income>(async (resolve) => {
                try {
                    const bytes = await file.arrayBuffer();
                    const buffer = Buffer.from(bytes);
                    const result = await pdf(buffer, { max: 1 });
                    const firstPage = result?.text;

                    const extractedInterface = extractContentFromFile('src/types/types.ts')

                    const prompt = `You must extract a JSON of type Paycheck following this schema:
          
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
                    resolve({} as Income);
                }
            });
        });

        const expenses = await Promise.all(incomesPromises);
        const filteredExpenses = expenses.filter((expense) => expense !== null);
        return ({ success: true, incomes: filteredExpenses })

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