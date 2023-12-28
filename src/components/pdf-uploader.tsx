import React, { useCallback } from "react";
import { useDropzone } from "react-dropzone";

const PdfUploader = ({
  onSuccess,
}: {
  onSuccess: (droppedFiles: File[]) => void;
}) => {
  const onDrop = useCallback(async (droppedFiles: File[]) => {
    try {
      onSuccess(droppedFiles);
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
