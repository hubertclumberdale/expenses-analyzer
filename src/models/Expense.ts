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
@index({ title: 1 })
class ExpenseClass {
  @prop({ required: true, unique: true })
  title: string;

  @prop({ required: true })
  fromDate: Date;

  @prop({ required: true })
  toDate: Date;

  @prop({ required: true })
  cost: number;

  @prop({ required: true })
  smcConsumption: number;

  @prop()
  activationCost?: number;

  @prop({ required: true })
  totalCost: number;

  @prop()
  paid?: boolean;
  @prop()
  monthlyInstallments?: number;

  @prop({ required: true })
  monthlyCost: number;

  @prop()
  notes?: string;

  _id?: mongoose.Types.ObjectId | string;

  id?: string;
}


const Expense = getModelForClass(ExpenseClass);
export { Expense, ExpenseClass };
