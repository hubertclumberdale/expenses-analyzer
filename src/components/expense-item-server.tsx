import { deleteExpenseAction, updateExpenseAction } from "@/app/_action";
import CheckBox from "./checkbox";
import { ExpenseClass } from "@/models/Expense";
import { Button, Form } from "react-bootstrap";

interface ExpenseItemProps {
  expense: ExpenseClass;
}

const ExpenseItem: React.FC<ExpenseItemProps> = ({ expense }) => {
  return (
    <Form className="flex items-center space-x-2 mb-2">
      <Button
        className={`px-2 py-1 flex-1 text-left ${
          expense.paid ? "line-through" : ""
        }`}
        formAction={async () => {
          "use server";
          await updateExpenseAction({
            expense: {
              ...expense,
              paid: !expense.paid,
            },
            path: "/",
          });
        }}
      >
        {expense.name}
      </Button>
      <div className="flex items-center">
        <CheckBox expense={expense} />
        <Button
          className="px-2 py-1 ml-2 text-white rounded bg-red-500 "
          formAction={async () => {
            "use server";
            await deleteExpenseAction({
              id: expense?.id ?? "",
              path: "/",
            });
          }}
        >
          Delete
        </Button>
      </div>
    </Form>
  );
};

export default ExpenseItem;
