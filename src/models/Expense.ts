import {
  ModelOptions,
  Severity,
  getModelForClass,
  index,
  post,
  prop,
} from "@typegoose/typegoose";
import mongoose from "mongoose";

@post<ExpenseClass>("save", function (doc) {
  if (doc) {
    doc.id = doc._id.toString();
    doc._id = doc.id;
  }
})
@post<ExpenseClass[]>(/^find/, function (docs) {
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
@index({ name: 1 })
class ExpenseClass {
  @prop({ required: true, unique: true })
  name: string;

  @prop({ required: true })
  fromDate: Date;

  @prop({ required: true })
  toDate: Date;

  @prop({ required: true })
  cost: number;

  @prop({ required: true })
  consumption: number;

  @prop()
  activationCost?: number;

  totalCost: number;

  @prop()
  paid?: boolean;

  @prop()
  monthlyInstallments?: number;

  monthlyCost: number;

  @prop()
  notes?: string;

  _id?: mongoose.Types.ObjectId | string;

  id?: string;
}


const Expense = getModelForClass(ExpenseClass);
export { Expense, ExpenseClass };
