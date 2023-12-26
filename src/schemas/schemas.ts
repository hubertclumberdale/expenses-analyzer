import * as typegoose from '@typegoose/typegoose';
import mongoose from 'mongoose';

@typegoose.modelOptions({ options: { allowMixed: typegoose.Severity.ALLOW } })
export class Transaction {
    @typegoose.prop({ type: () => mongoose.Types.ObjectId })
    _id?: mongoose.Types.ObjectId;

    @typegoose.prop()
    transactionId!: number;

    @typegoose.prop({ type: Date })
    date!: Date;

    @typegoose.prop({ type: Number })
    amount!: number;

    @typegoose.prop({ ref: () => Participant })
    participantId?: typegoose.Ref<Participant>;

    @typegoose.prop()
    paid!: boolean;
}

@typegoose.modelOptions({ options: { allowMixed: typegoose.Severity.ALLOW } })
export class Income extends Transaction {
    @typegoose.prop({ enum: ['income'], default: 'income' })
    type!: 'income';
}

@typegoose.modelOptions({ options: { allowMixed: typegoose.Severity.ALLOW } })
export class Paycheck extends Income {
    @typegoose.prop({ type: Number })
    totalNetMonth!: number;

    @typegoose.prop({ type: Number })
    vacation!: { balance: number };

    @typegoose.prop({ type: Number })
    permissions!: { balance: number };
}

@typegoose.modelOptions({ options: { allowMixed: typegoose.Severity.ALLOW } })
export class Expense extends Transaction {
    @typegoose.prop({ enum: ['expense'], default: 'expense' })
    type!: 'expense';
}

@typegoose.modelOptions({ options: { allowMixed: typegoose.Severity.ALLOW } })
export class Bill extends Expense {
    @typegoose.prop({ type: Date })
    fromDate!: Date;

    @typegoose.prop({ type: Date })
    toDate!: Date;

    @typegoose.prop({ type: Date })
    dueDate!: Date;

    @typegoose.prop({ type: Number })
    consumption?: number;

    @typegoose.prop({ type: Number })
    activationCost?: number;/* 

    @prop({ type: Number })
    totalCost!: number; */

    @typegoose.prop({ type: Number })
    monthlyInstallments?: number;
    /* 
        @prop({ type: Number })
        monthlyCost!: number;
     */
    @typegoose.prop()
    notes?: string;

    @typegoose.prop({ enum: ['gas', 'electricity'] })
    provider!: 'gas' | 'electricity';
}

@typegoose.modelOptions({ options: { allowMixed: typegoose.Severity.ALLOW } })
export class Participant {

    @typegoose.prop()
    name!: string;

    @typegoose.prop({ ref: () => Income })
    incomes!: typegoose.Ref<Income>[];
}

@typegoose.modelOptions({ options: { allowMixed: typegoose.Severity.ALLOW } })
export class Household {

    @typegoose.prop()
    name!: string;

    @typegoose.prop({ ref: () => Participant })
    participants!: typegoose.Ref<Participant>[];

    @typegoose.prop({ items: [Expense] })
    expenses!: (typegoose.Ref<Expense | Bill>)[];
}

@typegoose.modelOptions({ options: { allowMixed: typegoose.Severity.ALLOW } })
export class Analysis {
    @typegoose.prop()
    name!: string;

    @typegoose.prop({ ref: () => Participant })
    owner!: typegoose.Ref<Participant>;

    @typegoose.prop({ items: [Household] })
    households!: typegoose.Ref<Household>[];
}
