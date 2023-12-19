import { uploadExpenseAction } from "@/app/_action";
import { Expense } from "@/types/Expenses";
import React, { startTransition, useCallback } from "react";
import { useDropzone } from "react-dropzone";

const PdfUploader = ({
  onSuccess,
}: {
  onSuccess: (expenses: Expense[]) => void;
}) => {
  const uploadAndGetExpense = async (files: File[]) => {
    let formData = new FormData();
    files.forEach((file) => {
      formData.append(`files`, file);
    });
    const { expenses } = await uploadExpenseAction(formData);
    if (expenses) {
      onSuccess(expenses);
    }
  };

  const onDrop = useCallback(async (droppedFiles: any) => {
    try {
      startTransition(() => {
        uploadAndGetExpense(droppedFiles);
      });
    } catch (error) {
      console.error("Error uploading files:", error);
    }
  }, []);

  const { getRootProps, getInputProps, isDragActive } = useDropzone({ onDrop });

  return (
    <div {...getRootProps()} style={dropzoneStyle}>
      <input {...getInputProps()} />
      {isDragActive ? (
        <p>Drop the PDF files here...</p>
      ) : (
        <p>Drag & drop PDF files here, or click to select files</p>
      )}
    </div>
  );
};

const dropzoneStyle = {
  border: "2px dashed #cccccc",
  borderRadius: "4px",
  padding: "20px",
  height: "200px",
  cursor: "pointer",
};

export default PdfUploader;
