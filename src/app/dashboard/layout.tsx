"use client";
import { ExpensesProvider } from "@/contexts/expenses-context";

export default function Layout({ children }: { children: React.ReactNode }) {
  return <ExpensesProvider>{children}</ExpensesProvider>;
}
