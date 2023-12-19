import mongoose from "mongoose";

export interface Expense {
    reference: number; // generally the "rif.bolletta"

    issuedDate: Date;

    fromDate: Date;

    toDate: Date;

    dueDate: Date;

    /* this is the partial cost, just for consumptions */
    cost: number;

    consumption: number;

    /* this is an extra cost for the costs of activations */
    activationCost?: number;

    /* this is the sum of cost and activation cost */
    readonly totalCost: number;

    paid?: boolean;

    /* this is the number of months of this  */
    monthlyInstallments?: number;

    /* this is the total cost divided per months */
    monthlyCost: number;

    notes?: string;

    type?: 'gas' | 'electricty'

    _id?: mongoose.Types.ObjectId | string;

    id?: string;
}