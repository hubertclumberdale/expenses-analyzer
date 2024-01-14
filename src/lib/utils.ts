import ts from 'typescript'
import fs from 'fs'
import path from "path";

import mongoose from "mongoose";
import { NextResponse } from "next/server";
import { TransactionType } from '@/types/types';

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

export const extractInterfaceForType = (type: string) => {
  const repoRoot = process.cwd();

  const filePathInProcess = path.join(repoRoot, 'src/types/types.ts')

  const fileContent = fs.readFileSync(filePathInProcess, "utf-8");

  const sourceFile = ts.createSourceFile(
    filePathInProcess,
    fileContent,
    ts.ScriptTarget.Latest,
    true
  );

  const printer = ts.createPrinter();

  const output = sourceFile.statements.reduce((acc: string, statement: any) => {
    if (
      (ts.isInterfaceDeclaration(statement) || ts.isEnumDeclaration(statement)) &&
      (statement.name.text === 'Transaction' || statement.name.text === type || statement.name.text === 'TransactionType')
    ) {
      return acc + printer.printNode(ts.EmitHint.Unspecified, statement, sourceFile);
    }
    return acc;
  }, '');

  if (output) {
    return output;
  } else {
    console.error(`Couldn't extract interface for type: ${type}`);
  }
}