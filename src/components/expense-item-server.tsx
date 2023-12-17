import { deleteExpenseAction, updateExpenseAction } from "@/app/_action";
import CheckBox from "./checkbox";
import { ExpenseClass } from "@/models/Expense";

interface ExpenseItemProps {
  expense: ExpenseClass;
}

const ExpenseItem: React.FC<ExpenseItemProps> = ({ expense }) => {
  return (
    <form className="flex items-center space-x-2 mb-2">
      <button
        className={`px-2 py-1 flex-1 text-left ${
          expense.completed ? "line-through" : ""
        }`}
        formAction={async () => {
          "use server";
          await updateExpenseAction(
            expense.id,
            { completed: !expense.completed },
            "/"
          );
        }}
      >
        {expense.title}
      </button>
      <div className="flex items-center">
        <CheckBox expense={expense} />
        <button
          className="px-2 py-1 ml-2 text-white rounded bg-red-500 "
          formAction={async () => {
            "use server";
            await deleteExpenseAction({
              id: expense.id,
              path: "/",
            });
          }}
        >
          Delete
        </button>
      </div>
    </form>
  );
};

export default ExpenseItem;
