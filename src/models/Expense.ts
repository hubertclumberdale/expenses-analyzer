import { Expense as IExpense } from "@/types/types";
import {
  ModelOptions,
  Severity,
  getModelForClass,
  index,
  post,
  prop,
} from "@typegoose/typegoose";
import mongoose from "mongoose";

@post<ExpenseModel>("save", function (doc) {
  if (doc) {
    doc.id = doc._id.toString();
    doc._id = doc.id;
  }
})
@post<ExpenseModel[]>(/^find/, function (docs) {
  // @ts-ignore
  if (this.op === "find") {
    docs.forEach((doc) => {
      doc.id = doc?._id?.toString();
      doc._id = doc.id;
    });
  }
})
@ModelOptions({
  schemaOptions: {
    timestamps: true,
    collection: "expenses",
  },
  options: {
    allowMixed: Severity.ALLOW,
  },
})
@index({ reference: 1 })
class ExpenseModel implements IExpense {
  @prop({ required: true, unique: true })
  reference: number;

  @prop({ required: true })
  transactionId: number;

  @prop({ required: true })
  date: Date;

  @prop({ required: true })
  fromDate: Date;

  @prop({ required: true })
  toDate: Date;

  @prop({ required: true })
  dueDate: Date;

  @prop({ required: true })
  amount: number;

  @prop({ required: true })
  consumption: number;

  @prop()
  activationCost?: number;

  get totalCost() {
    if (!this.activationCost) {
      return this.amount
    }
    return this.amount + this.activationCost
  }

  @prop()
  paid: boolean;

  @prop()
  monthlyInstallments?: number;

  monthlyCost: number;

  @prop()
  notes?: string;

  @prop({ required: true })
  provider: 'gas' | 'electricty';

  type: 'expense'

  _id?: mongoose.Types.ObjectId | string;

  id?: string;
}


const Expense = getModelForClass(ExpenseModel);
export { Expense, ExpenseModel };
