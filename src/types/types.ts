import mongoose from "mongoose";
import { Types } from "mongoose";


export enum TransactionType {
    EXPENSE = 'expense',
    INCOME = 'income'
}

export interface Participant {
    _id?: Types.ObjectId | string // id used by mongoose
    name: string;
    incomes: Income[]
}

export interface Transaction {
    _id?: Types.ObjectId | string // id used by mongoose
    transactionId: number, // generally the number that identifies the transaction such as rif.bolletta
    date: Date
    amount: number;
    paid: boolean
    owner?: Types.ObjectId | string; // Updated type
}

export interface Household {
    _id?: Types.ObjectId | string // id used by mongoose
    name: string
    participants: Participant[]
    expenses: (Expense | Bill)[]
}

export interface Analysis {
    name: string
    owner: Participant
    households: Household[]
}


export type Income = Transaction & {
    type: TransactionType.INCOME;
};

export interface Paycheck extends Income {
    totalNetMonth: number // in general is something like "netto del mese" or can be calculated by "totale competenze" minus "totale trattenute"
    vacation: {
        balance: number
    }
    permissions: {
        balance: number
    }
}

export type Expense = Transaction & {
    type: TransactionType.EXPENSE;
};

export interface Bill extends Expense {

    fromDate: Date;

    toDate: Date;

    dueDate: Date;

    consumption?: number; // it is generally the number of smc or kwh consumed

    /* this is the extra cost for providers activations */
    activationCost?: number;

    /* this is the sum between cost and activation cost */
    /*     readonly totalCost: number;
     */
    /* this is the number of months of this expense  */
    monthlyInstallments?: number;

    /* this is the total cost divided per months */
    /*     readonly monthlyCost: number;
     */
    notes?: string;

    provider: 'gas' | 'electricity'
}