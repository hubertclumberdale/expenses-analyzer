"use server";
import { createTransaction, deleteTransaction, getTransactions, updateTransaction } from "@/mutations/transactions";
import { Transaction } from "@/types/types";

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
    id,
    path,
}: {
    id: string;
    path: string;
}) {
    if (id) {
        await deleteTransaction(id);
    }
}