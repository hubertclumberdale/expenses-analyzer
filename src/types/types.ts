import { Types } from "mongoose";


export enum TransactionType {
    TRANSACTION = 'Transaction',
    EXPENSE = 'Expense',
    INCOME = 'Income',
    BILL = 'Bill',
    REFUND = 'Refund',
    PAYCHECK = 'Paycheck',
}

export interface Participant {
    _id?: Types.ObjectId | string // id used by mongoose
    name: string;
    incomes: Transaction[]
}

export interface Transaction {
    _id?: Types.ObjectId | string // id used by mongoose
    name: string
    transactionId: number, // generally the number that identifies the transaction such as rif.bolletta
    date: Date
    amount: number; // this is the total price of the transaction, for bills is the total amount to pay (for example "Totale bolletta" or "Totale Fattura" or "Quanto devo pagare")
    paid: boolean
    owner?: Participant; // Updated type
    type: TransactionType;
}

export interface Household {
    _id?: Types.ObjectId | string // id used by mongoose
    name: string
    participants: Participant[]
    expenses: Transaction[]
    refunds: Transaction[]
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

export interface Bill extends Transaction {
    type: TransactionType.BILL; // The type of the transaction, which is always TransactionType.BILL.
    provider: 'gas' | 'electricity'; // The provider of the bill, which can be 'gas' or 'electricity'.
    fromDate: Date; // The start date of the bill.
    toDate: Date; // The end date of the bill.
    dueDate: Date; // The due date of the bill.
    consumption?: number; // The consumption amount, which represents the number of smc or kwh consumed based on the provider of the bill- (SMC is for gas bills, Khw is for electricity bills).
    activationCost?: number; // The activation cost for the provider.
    monthlyInstallments?: number; // The number of monthly installments for this expense, calculated by the difference in months between fromDate and toDate.
    notes?: string; // Additional notes for the bill.
}