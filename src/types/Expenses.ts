import mongoose from "mongoose";

export interface IExpense {
    reference: number; // generally the "rif.bolletta"

    issuedDate: Date;

    fromDate: Date;

    toDate: Date;

    dueDate: Date;

    /* this is the partial cost just for consumptions */
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

export class Expense implements IExpense {
    public reference: number;
    public issuedDate: Date;
    public fromDate: Date;
    public toDate: Date;
    public dueDate: Date;
    public cost: number;
    public consumption: number;
    public monthlyCost: number;
    public activationCost?: number;
    public paid?: boolean;
    public monthlyInstallments?: number;
    public notes?: string;
    public type?: 'gas' | 'electricty';
    public _id?: mongoose.Types.ObjectId | string;
    public id?: string


    constructor(expense: IExpense) {
        const { reference,
            issuedDate,
            fromDate,
            toDate,
            dueDate,
            cost,
            consumption,
            monthlyCost,
            activationCost,
            paid,
            monthlyInstallments,
            notes,
            type,
            _id,
            id } = expense
        this.reference = reference
        this.issuedDate = issuedDate
        this.fromDate = fromDate
        this.toDate = toDate
        this.dueDate = dueDate
        this.cost = cost
        this.consumption = consumption
        this.monthlyCost = monthlyCost
        this.activationCost = activationCost
        this.paid = paid
        this.monthlyInstallments = monthlyInstallments
        this.notes = notes
        this.type = type
        this._id = _id
        this.id = id
    }

    get totalCost() {
        if (!this.activationCost) {
            return this.cost
        }
        return this.cost + this.activationCost
    }
}