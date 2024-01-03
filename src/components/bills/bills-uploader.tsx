import { extractExpenseAction } from "@/actions/expenses";
import PdfUploader from "@/components/pdf-uploader";
import { Bill, Expense } from "@/types/types";
import { startTransition } from "react";

const ExpensesUploader = ({
  onSuccess,
}: {
  onSuccess: (expenses: (Expense | Bill)[]) => void;
}) => {
  const uploadAndGetExpense = async (files: File[]) => {
    let formData = new FormData();
    files.forEach((file) => {
      formData.append(`files`, file);
    });
    formData.append("expenseType", "Bill");
    const { expenses } = await extractExpenseAction(formData);
    if (expenses) {
      onSuccess(expenses);
    }
  };

  return (
    <>
      <PdfUploader
        onSuccess={(droppedFiles) => {
          startTransition(() => {
            uploadAndGetExpense(droppedFiles);
          });
        }}
      ></PdfUploader>
    </>
  );
};

export default ExpensesUploader;
