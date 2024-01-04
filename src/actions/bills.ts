"use server";

import chatGPTClient from "@/lib/chatgpt-client";
import { extractContentFromFile } from "@/lib/utils";
import { Bill, Expense } from "@/types/types";
import { createBill, deleteBill, getBills, updateBill } from "@/mutations/bills";
const pdf = require('pdf-parse');

export async function getBillsAction() {
    const bills = await getBills()
    return JSON.parse(JSON.stringify(bills))
}

export async function createBillAction({
    bill,
    path,
}: {
    bill: Bill;
    path: string;
}) {
    const { created } = await createBill(bill);
    return JSON.parse(JSON.stringify(created))
}

export async function updateBillAction(
    {
        bill,
        path
    }: {
        bill: Bill,
        path: string
    }
) {
    await updateBill(bill);
}

export async function deleteBillAction({
    bill,
    path,
}: {
    bill: Bill;
    path: string;
}) {
    if (bill._id) {
        await deleteBill(bill._id.toString());
    }
}

export async function extractBillAction(data: FormData) {
    const files: File[] | null = data.getAll('files') as unknown as File[]
    if (!files) {
        throw new Error('No files uploaded')
    }

    const expenseType: string = data.get('expenseType') as string

    let parentMessageId: string | undefined = undefined
    try {
        const billsPromises = files.map(async (file: File) => {
            return new Promise<Expense>(async (resolve) => {
                try {
                    const bytes = await file.arrayBuffer();
                    const buffer = Buffer.from(bytes);
                    const result = await pdf(buffer, { max: 1 });
                    const firstPage = result?.text;

                    const extractedInterface = extractContentFromFile('src/types/types.ts')

                    const prompt = `You must extract a JSON of type ${expenseType} following this schema:
        
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

        const bills = await Promise.all(billsPromises);
        const filteredBills = bills.filter((expense) => expense !== null);
        return ({ success: true, bills: filteredBills })

    } catch (error: any) {
        if (typeof error === "string" && error.includes("Bill not found")) {
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