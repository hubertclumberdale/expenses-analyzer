import { extractBillAction } from "@/actions/bills";
import PdfUploader from "@/components/pdf-uploader";
import { Bill } from "@/types/types";
import { startTransition } from "react";

const BillsUploader = ({
  onSuccess,
}: {
  onSuccess: (expenses: Bill[]) => void;
}) => {
  const uploadAndGetExpense = async (files: File[]) => {
    let formData = new FormData();
    files.forEach((file) => {
      formData.append(`files`, file);
    });
    formData.append("expenseType", "Bill");
    const { bills } = await extractBillAction(formData);
    if (bills) {
      onSuccess(bills);
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

export default BillsUploader;
