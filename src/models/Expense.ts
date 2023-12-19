import { IExpense } from "@/types/Expenses";
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
  issuedDate: Date;

  @prop({ required: true })
  fromDate: Date;

  @prop({ required: true })
  toDate: Date;

  @prop({ required: true })
  dueDate: Date;

  @prop({ required: true })
  cost: number;

  @prop({ required: true })
  consumption: number;

  @prop()
  activationCost?: number;

  get totalCost() {
    if (!this.activationCost) {
      return this.cost
    }
    return this.cost + this.activationCost
  }

  @prop()
  paid?: boolean;

  @prop()
  monthlyInstallments?: number;

  monthlyCost: number;

  @prop()
  notes?: string;

  @prop({ required: true })
  type?: 'gas' | 'electricty';


  _id?: mongoose.Types.ObjectId | string;

  id?: string;
}


const Expense = getModelForClass(ExpenseModel);
export { Expense, ExpenseModel };
