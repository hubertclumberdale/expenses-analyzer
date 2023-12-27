import { Analysis, Bill, Expense, Household, Income, Participant, Paycheck, Transaction } from "@/schemas/schemas";
import { getModelForClass } from "@typegoose/typegoose";

export const IncomeModel = getModelForClass(Income);
export const PaycheckModel = getModelForClass(Paycheck);
export const ExpenseModel = getModelForClass(Expense);
export const BillModel = getModelForClass(Bill);
export const ParticipantModel = getModelForClass(Participant);
export const HouseholdModel = getModelForClass(Household);
export const AnalysisModel = getModelForClass(Analysis);