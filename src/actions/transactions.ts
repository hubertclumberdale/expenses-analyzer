"use server";
import { createTransaction, deleteTransaction, getTransactions, updateTransaction } from "@/mutations/transactions";
import { Transaction } from "@/types/types";
const pdf = require('pdf-parse');

export async function getTransactionsActions() {
    const transactions = await getTransactions()
    return JSON.parse(JSON.stringify(transactions))
}

export async function createTransactionAction({
    transaction,
    path,
}: {
    transaction: Transaction;
    path: string;
}) {
    const { created: newTransaction } = await createTransaction(transaction);
    return JSON.parse(JSON.stringify(newTransaction))
}

export async function updateTransactionAction(
    {
        transaction,
        path
    }: {
        transaction: Transaction,
        path: string
    }
) {
    await updateTransaction(transaction);
}

export async function deleteTransactionAction({
    transaction,
    path,
}: {
    transaction: Transaction;
    path: string;
}) {
    if (transaction._id) {
        await deleteTransaction(transaction._id.toString());
    }
}