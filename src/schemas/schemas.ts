import * as typegoose from '@typegoose/typegoose';
import mongoose from 'mongoose';
import { setLogLevel, LogLevels } from '@typegoose/typegoose';

setLogLevel(LogLevels.DEBUG);

@typegoose.modelOptions({ options: { allowMixed: typegoose.Severity.ERROR } })
export class Transaction {
    @typegoose.prop({ type: () => mongoose.Types.ObjectId })
    _id?: mongoose.Types.ObjectId;

    @typegoose.prop()
    name: string;

    @typegoose.prop()
    transactionId: number;

    @typegoose.prop({ type: Date })
    date: Date;

    @typegoose.prop({ type: Number })
    amount: number;

    @typegoose.prop({ ref: () => Participant })
    owner?: typegoose.Ref<Participant>;

    @typegoose.prop()
    paid: boolean;

    @typegoose.prop({ enum: ['Bill', 'Paycheck', 'Expense', 'Income', 'Refund'] })
    type!: 'Bill' | 'Paycheck' | 'Expense' | 'Income' | 'Refund';
}

@typegoose.modelOptions({ options: { allowMixed: typegoose.Severity.ERROR } })
export class Income extends Transaction {
    @typegoose.prop({ enum: ['Income'], default: 'Income' })
    type!: 'Income';
}

@typegoose.modelOptions({ options: { allowMixed: typegoose.Severity.ERROR } })
export class Paycheck extends Income {
    @typegoose.prop({ type: Number })
    totalNetMonth!: number;

    @typegoose.prop({ type: Number })
    vacation!: { balance: number };

    @typegoose.prop({ type: Number })
    permissions!: { balance: number };
}

@typegoose.modelOptions({ options: { allowMixed: typegoose.Severity.ERROR } })
export class Expense extends Transaction {
    @typegoose.prop({ enum: ['Expense'], default: 'Expense' })
    type!: 'Expense';
}

@typegoose.modelOptions({ options: { allowMixed: typegoose.Severity.ERROR } })
export class Bill extends Transaction {
    @typegoose.prop({ type: Date })
    fromDate: Date;

    @typegoose.prop({ type: Date })
    toDate: Date;

    @typegoose.prop({ type: Date })
    dueDate: Date;

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
    provider: 'gas' | 'electricity';

    @typegoose.prop({ enum: ['Bill'], default: 'Bill' })
    type!: 'Bill';
}

@typegoose.modelOptions({ options: { allowMixed: typegoose.Severity.ERROR } })
export class Participant {

    @typegoose.prop()
    name!: string;

    @typegoose.prop({ ref: () => Income })
    incomes!: typegoose.Ref<Income>[];
}
@typegoose.modelOptions({ options: { allowMixed: typegoose.Severity.ERROR } })
export class Household {

    @typegoose.prop()
    name!: string;

    @typegoose.prop({ ref: () => Participant })
    participants!: typegoose.Ref<Participant>[];

    @typegoose.prop({ ref: () => Transaction, discriminate: () => 'type' })
    expenses!: typegoose.Ref<Transaction>[];

    @typegoose.prop({ ref: () => Transaction, discriminate: () => 'type' })
    refunds!: typegoose.Ref<Transaction>[];
}

@typegoose.modelOptions({ options: { allowMixed: typegoose.Severity.ERROR } })
export class Analysis {
    @typegoose.prop()
    name!: string;

    @typegoose.prop({ ref: () => Participant })
    owner!: typegoose.Ref<Participant>;

    @typegoose.prop({ ref: () => Household })
    households!: typegoose.Ref<Household>[];
}
