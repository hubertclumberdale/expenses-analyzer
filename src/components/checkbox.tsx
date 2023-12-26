"use client";

import { updateExpenseAction } from "@/app/_action";
import { Expense } from "@/types/types";
import { useTransition } from "react";

type CheckBoxProps = {
  expense: Expense;
};

export default function CheckBox({ expense }: CheckBoxProps) {
  const [isPending, startTransition] = useTransition();

  return (
    <input
      type="checkbox"
      checked={expense.paid}
      name="paid"
      onChange={() =>
        startTransition(() =>
          updateExpenseAction({
            expense: {
              ...expense,
              paid: !expense.paid,
            },
            path: "/with-server-actions",
          })
        )
      }
      disabled={isPending}
      className="h-6 w-6 border-gray-300 disabled:bg-gray-300 disabled:border-gray-300 disabled:cursor-not-allowed"
    />
  );
}
