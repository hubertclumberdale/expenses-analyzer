import connectDB from "@/lib/connect-db";
import { deleteExpense, getExpense, updateExpense } from "@/lib/expenses-db";
import { createErrorResponse } from "@/lib/utils";
import { NextResponse } from "next/server";

export async function GET(
  _request: Request,
  { params }: { params: { id: string } }
) {
  try {
    await connectDB();

    const id = params.id;
    const { expense, error } = await getExpense(id);

    if (error) {
      throw error;
    }

    let json_response = {
      status: "success",
      data: {
        expense,
      },
    };
    return NextResponse.json(json_response);
  } catch (error: any) {
    if (typeof error === "string" && error.includes("Expense not found")) {
      return createErrorResponse("Expense not found", 404);
    }

    return createErrorResponse(error.message, 500);
  }
}

export async function PATCH(
  request: Request,
  { params }: { params: { id: string } }
) {
  try {
    await connectDB();

    const id = params.id;
    let body = await request.json();

    const { expense, error } = await updateExpense(body);

    if (error) {
      throw error;
    }

    let json_response = {
      status: "success",
      data: {
        expense,
      },
    };
    return NextResponse.json(json_response);
  } catch (error: any) {
    if (typeof error === "string" && error.includes("Expense not found")) {
      return createErrorResponse("Expense not found", 404);
    }

    return createErrorResponse(error.message, 500);
  }
}

export async function DELETE(
  request: Request,
  { params }: { params: { id: string } }
) {
  try {
    await connectDB();

    const id = params.id;
    const { error } = await deleteExpense(id);

    if (error) {
      throw error;
    }

    return new NextResponse(null, { status: 204 });
  } catch (error: any) {
    if (typeof error === "string" && error.includes("Expense not found")) {
      return createErrorResponse("Expense not found", 404);
    }

    return createErrorResponse(error.message, 500);
  }
}
