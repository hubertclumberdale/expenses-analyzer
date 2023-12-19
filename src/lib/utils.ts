import ts from 'typescript'
import fs from 'fs'
import path from "path";

import mongoose from "mongoose";
import { NextResponse } from "next/server";

export function stringToObjectId(id: string): mongoose.Types.ObjectId | null {
  if (mongoose.Types.ObjectId.isValid(id)) {
    return new mongoose.Types.ObjectId(id);
  } else {
    return null;
  }
}

export function createErrorResponse(
  message: string,
  statusCode: number
): NextResponse {
  const errorResponse = {
    status: statusCode >= 500 ? "error" : "fail",
    message,
  };

  return new NextResponse(JSON.stringify(errorResponse), {
    status: statusCode,
    headers: { "Content-Type": "application/json" },
  });
}

export const extractContentFromFile = (filePath: string) => {
  const repoRoot = process.cwd();

  const filePathInProcess = path.join(repoRoot, filePath)

  const fileContent = fs.readFileSync(filePathInProcess, "utf-8");

  const sourceFile = ts.createSourceFile(
    filePathInProcess,
    fileContent,
    ts.ScriptTarget.Latest,
    true
  );

  let output = ''
  const printer = ts.createPrinter();

  sourceFile.statements.forEach((statement: any) => {
    const int = printer.printNode(ts.EmitHint.Unspecified, statement, sourceFile);
    output += int
  })

  if (output) {
    return output
  } else {
    console.error(`Couldn't extract file: ${filePathInProcess}`);
  }
}