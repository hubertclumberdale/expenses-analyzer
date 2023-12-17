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
      doc.id = doc._id.toString();
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

  @prop({ default: false })
  completed: boolean;

  _id: mongoose.Types.ObjectId | string;

  id: string;
}

const Expense = getModelForClass(ExpenseClass);
export { Expense, ExpenseClass };
