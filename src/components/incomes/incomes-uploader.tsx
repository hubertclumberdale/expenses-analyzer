import { extractPaycheckAction } from "@/actions/incomes";
import PdfUploader from "@/components/pdf-uploader";
import { Income } from "@/types/types";
import { startTransition } from "react";

const IncomesUploader = ({
  onSuccess,
}: {
  onSuccess: (expenses: Income[]) => void;
}) => {
  const uploadAndGetIncome = async (files: File[]) => {
    let formData = new FormData();
    files.forEach((file) => {
      formData.append(`files`, file);
    });
    const { incomes } = await extractPaycheckAction(formData);
    if (incomes) {
      onSuccess(incomes);
    }
  };

  return (
    <>
      <PdfUploader
        onSuccess={(droppedFiles) => {
          startTransition(() => {
            uploadAndGetIncome(droppedFiles);
          });
        }}
      ></PdfUploader>
    </>
  );
};

export default IncomesUploader;
