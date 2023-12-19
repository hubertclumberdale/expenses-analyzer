import { Expense, IExpense } from "@/types/Expenses";
import React, {
  createContext,
  useContext,
  ReactNode,
  useState,
  useEffect,
} from "react";

interface ExpensesContextProps {
  expenses: IExpense[];
  setExpenses: React.Dispatch<React.SetStateAction<IExpense[]>>;
  results: number;
  setResults: React.Dispatch<React.SetStateAction<number>>;
  loading: boolean;
  setLoading: React.Dispatch<React.SetStateAction<boolean>>;
  refresh: number;
  setRefresh: React.Dispatch<React.SetStateAction<number>>;
  incrementRefresh: () => void;
}

const ExpensesContext = createContext<ExpensesContextProps | undefined>(
  undefined
);

export const ExpensesProvider: React.FC<{ children: ReactNode }> = ({
  children,
}) => {
  const [expenses, setExpenses] = useState<IExpense[]>([]);
  const [results, setResults] = useState<number>(0);
  const [loading, setLoading] = useState<boolean>(false);
  const [refresh, setRefresh] = useState<number>(0);

  const incrementRefresh = () => {
    const newRefresh = refresh + 1;
    setRefresh(newRefresh);
  };

  const fetchExpenses = async () => {
    const url = process.env.NEXT_PUBLIC_HOST;
    const response = await fetch(`${url}/api/expenses`);
    const result = await response.json();
    const { status, expenses, results } = result as {
      status: string;
      expenses: IExpense[];
      results: number;
    };
    if (status !== "success") {
      setResults(0);
      return;
    }
    if (expenses) {
      const instances = expenses.map((expense) => new Expense(expense));
      setExpenses(instances);
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
        incrementRefresh,
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
