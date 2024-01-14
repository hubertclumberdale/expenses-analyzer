"use server";

import chatGPTClient from "@/lib/chatgpt-client";
import { extractContentFromFile, extractInterfaceForType } from "@/lib/utils";
import { Bill, TransactionType } from "@/types/types";
import { createBill, deleteBill, getBills, updateBill } from "@/mutations/bills";
import { extractFirstUsefulPage } from "@/lib/extractor";
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


const generateEmptyBill = (bill = {}): Bill => {
    return {
        name: "",
        amount: 0,
        date: new Date(),
        paid: false,
        transactionId: 0,
        type: TransactionType.BILL,
        fromDate: new Date(),
        toDate: new Date(),
        dueDate: new Date(),
        provider: "gas",
        ...bill
    }
}

export async function extractBillAction(data: FormData): Promise<Bill> {
    const file: File | null = data.get('file') as unknown as File
    if (!file) {
        throw new Error('No file uploaded')
    }

    const expenseType: string = data.get('transactionType') as string

    const firstUsefulPage = await extractFirstUsefulPage(file);

    if (!firstUsefulPage) {
        console.log("Generating empty bill")
        return generateEmptyBill({ name: file.name });
    }
    const extractedInterfaces = extractInterfaceForType(expenseType);

    const prompt = `
        Given this schema: ${extractedInterfaces} you must extract a JSON (give me only the json. directly) of type ${expenseType}. 
        Constraints:
            - The JSON must be valid
            - The JSON must not contain "notes" field
            - The JSON must not contain "owner" field
            - If uncertain about dates, use this date ${new Date()}
        This is from where you must extract the ${expenseType}: ${firstUsefulPage}`;

    const sanitizedPrompt = prompt.replace('\n', '').replace(' ', '').replace(/\n/g, '');

    const response = await chatGPTClient.sendMessage({
        prompt: decodeURIComponent(sanitizedPrompt),
    });
    const bill = response.text.replace(/Invalid Date/g, `${new Date()}`).replace(/null/g, '""');
    console.log("sanitized bill: ", bill)
    try {
        const parsedExpense = JSON.parse(bill)
        parsedExpense.notes = ''
        return (parsedExpense);
    } catch (e) {
        console.error("Error parsing expense: ", e)
        console.log("Generating empty bill")
        return generateEmptyBill({ name: file.name });
    }
}
