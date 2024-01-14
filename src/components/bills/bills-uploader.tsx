import { extractBillAction } from "@/actions/bills";
import PdfUploader from "@/components/pdf-uploader";
import { useSpinnerContext } from "@/contexts/spinner";
import { Bill, TransactionType } from "@/types/types";
import { startTransition } from "react";

const BillsUploader = ({
  onSuccess,
}: {
  onSuccess: (expenses: Bill[]) => void;
}) => {
  const { incrementCounter, decrementCounter } = useSpinnerContext();
  const uploadAndGetExpense = async (files: File[]) => {
    files.forEach(async (file) => {
      incrementCounter();
      let formData = new FormData();
      formData.append(`file`, file);
      formData.append("transactionType", `${TransactionType.BILL}`);
      const bill = await extractBillAction(formData);
      if (bill) {
        decrementCounter();
        onSuccess([bill]);
      }
    });
  };

  return (
    <>
      <PdfUploader onSuccess={uploadAndGetExpense}></PdfUploader>
    </>
  );
};

export default BillsUploader;
