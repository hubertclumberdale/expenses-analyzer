import {
  createExpenseAction,
  deleteExpenseAction,
  getExpensesAction,
  updateExpenseAction,
} from "@/actions/expenses";
import { Expense } from "@/types/types";
import React, {
  createContext,
  useContext,
  ReactNode,
  useState,
  useEffect,
} from "react";

interface ExpensesContextProps {
  expenses: Expense[];
  setExpenses: React.Dispatch<React.SetStateAction<Expense[]>>;
  results: number;
  setResults: React.Dispatch<React.SetStateAction<number>>;
  loading: boolean;
  setLoading: React.Dispatch<React.SetStateAction<boolean>>;
  refresh: number;
  setRefresh: React.Dispatch<React.SetStateAction<number>>;
  refreshExpenses: () => void;
  createExpense: (expense: Expense) => Promise<Expense>;
  deleteExpense: (expense: Expense) => Promise<void>;
  updateExpense: (expense: Expense) => Promise<void>;
}

const ExpensesContext = createContext<ExpensesContextProps | undefined>(
  undefined
);

export const ExpensesProvider: React.FC<{ children: ReactNode }> = ({
  children,
}) => {
  const [expenses, setExpenses] = useState<Expense[]>([]);
  const [results, setResults] = useState<number>(0);
  const [loading, setLoading] = useState<boolean>(false);
  const [refresh, setRefresh] = useState<number>(0);

  const refreshExpenses = () => {
    const newRefresh = refresh + 1;
    setRefresh(newRefresh);
  };

  const fetchExpenses = async () => {
    const { expenses, results } = await getExpensesAction();
    if (expenses?.length === 0) {
      setResults(0);
      return;
    }
    if (expenses) {
      setExpenses(expenses);
    }
    if (results) {
      setResults(results);
    }
  };

  const createExpense = async (expense: Expense) => {
    const newExpense = await createExpenseAction({
      expense,
      path: "/expenses",
    });
    return newExpense;
  };

  const deleteExpense = async (expense: Expense) => {
    await deleteExpenseAction({ expense, path: "/expenses" });
  };

  const updateExpense = async (expense: Expense) => {
    await updateExpenseAction({ path: `/expenses`, expense });
  };

  useEffect(() => {
    fetchExpenses();
  }, [refresh]);

  return (
    <ExpensesContext.Provider
      value={{
        expenses: expenses,
        setExpenses: setExpenses,
        results,
        setResults,
        loading,
        setLoading,
        refresh,
        setRefresh,
        refreshExpenses,
        createExpense,
        deleteExpense,
        updateExpense,
      }}
    >
      {children}
    </ExpensesContext.Provider>
  );
};

export const useExpensesContext = () => {
  const context = useContext(ExpensesContext);
  if (!context) {
    throw new Error("useIncomesContext must be used within a ExpensesProvider");
  }
  return context;
};
