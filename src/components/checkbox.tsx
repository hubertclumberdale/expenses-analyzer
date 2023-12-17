"use client";

import { updateExpenseAction } from "@/app/_action";
import { TodoClass } from "@/models/Expense";
import { useTransition } from "react";

type CheckBoxProps = {
  expense: TodoClass;
};

export default function CheckBox({ expense }: CheckBoxProps) {
  const [isPending, startTransition] = useTransition();

  return (
    <input
      type="checkbox"
      checked={expense.completed}
      name="completed"
      onChange={() =>
        startTransition(() =>
          updateExpenseAction(
            expense.id,
            { completed: !expense.completed },
            "/with-server-actions"
          )
        )
      }
      disabled={isPending}
      className="h-6 w-6 border-gray-300 disabled:bg-gray-300 disabled:border-gray-300 disabled:cursor-not-allowed"
    />
  );
}
