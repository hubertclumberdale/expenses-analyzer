import { Analysis, Bill, Expense, Household, Income, Participant, Paycheck, Transaction } from "@/schemas/schemas";
import { getDiscriminatorModelForClass, getModelForClass } from "@typegoose/typegoose";

export const TransactionModel = getModelForClass(Transaction);
export const IncomeModel = getDiscriminatorModelForClass(TransactionModel, Income);
export const PaycheckModel = getDiscriminatorModelForClass(TransactionModel, Paycheck);
export const ExpenseModel = getDiscriminatorModelForClass(TransactionModel, Expense);
export const BillModel = getDiscriminatorModelForClass(TransactionModel, Bill);

export const ParticipantModel = getModelForClass(Participant);
export const HouseholdModel = getModelForClass(Household);
export const AnalysisModel = getModelForClass(Analysis);