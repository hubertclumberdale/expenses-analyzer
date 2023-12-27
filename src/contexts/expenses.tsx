import { getExpensesAction } from "@/actions/expenses";
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

  useEffect(() => {
    fetchExpenses();
  }, [refresh]);

  return (
    <ExpensesContext.Provider
      value={{
        expenses,
        setExpenses,
        results,
        setResults,
        loading,
        setLoading,
        refresh,
        setRefresh,
        refreshExpenses,
      }}
    >
      {children}
    </ExpensesContext.Provider>
  );
};

export const useExpensesContext = () => {
  const context = useContext(ExpensesContext);
  if (!context) {
    throw new Error(
      "useExpensesContext must be used within a ExpensesProvider"
    );
  }
  return context;
};
