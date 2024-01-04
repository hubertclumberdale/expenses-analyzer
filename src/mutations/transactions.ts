import { BillModel, ExpenseModel, IncomeModel, TransactionModel } from "@/models/models";
import connectDB from "../lib/connect-db";
import { Transaction } from '@/types/types'
import { Types } from "mongoose";
import { createExpense, getExpenses, updateExpense } from "@/mutations/expenses";
import { createIncome, getIncomes, updateIncome } from "@/mutations/incomes";
import { createBill, getBills, updateBill } from "@/mutations/bills";
interface TransactionsFilters {
    page?: number;
    limit?: number;
}

export async function getTransactions(filter: TransactionsFilters = {}) {
    try {
        await connectDB();

        const expensesResult = await getExpenses(filter)
        const incomesResult = await getIncomes(filter)
        const billsResult = await getBills(filter)

        return {
            transactions: [...expensesResult.expenses ?? [], ...incomesResult.incomes ?? [], ...billsResult.bills ?? []],
            page: filter.page ?? 1,
            limit: filter.limit ?? 10,
            results: (expensesResult?.results ?? 0) + (incomesResult?.results ?? 0) + (billsResult?.results ?? 0),
        };
    } catch (error) {
        return { error };
    }
}

export async function createTransaction(transaction: Transaction) {
    try {
        await connectDB();

        if (transaction.type === 'expense') {
            const { created } = await createExpense(transaction)
            return {
                created,
            };
        }
        if (transaction.type === 'income') {
            const { created } = await createIncome(transaction)
            return {
                created,
            };
        }

        if (transaction.type === 'bill') {
            const { created } = await createBill(transaction)
            return {
                created,
            };
        }
        const created = await TransactionModel.create({ _id: new Types.ObjectId(), transaction });
        return {
            created,
        };
    } catch (error) {
        console.error(error)
        return { error };
    }
}

export async function getTransaction(id: string) {
    try {
        await connectDB();

        const transaction = await IncomeModel.findById(id).lean().exec();
        if (transaction) {
            return {
                transaction,
            };
        } else {
            return { error: "Transaction not found" };
        }
    } catch (error) {
        return { error };
    }
}

export async function updateTransaction(
    transaction: Transaction
) {
    try {
        await connectDB();
        let found = null

        if (transaction.type === 'expense') {
            found = updateExpense(transaction)
        }

        if (transaction.type === 'income') {
            found = updateIncome(transaction)
        }

        if (transaction.type === 'bill') {
            found = updateBill(transaction)
        }


        if (found) {
            return {
                transaction: found,
            };
        } else {
            return { error: "Income not found" };
        }
    } catch (error) {
        return { error };
    }
}

export async function deleteTransaction(id: string) {
    try {
        await connectDB();

        const income = await IncomeModel.findByIdAndDelete(id).exec();

        if (income) {
            return {};
        } else {
            return { error: "Income not found" };
        }
    } catch (error) {
        return { error };
    }
}
