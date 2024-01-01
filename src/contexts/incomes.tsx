import {
  createIncomeAction,
  deleteIncomeAction,
  getIncomesAction,
  updateIncomeAction,
} from "@/actions/incomes";
import { Income } from "@/types/types";
import React, {
  createContext,
  useContext,
  ReactNode,
  useState,
  useEffect,
} from "react";

interface IncomesContextProps {
  incomes: Income[];
  setIncomes: React.Dispatch<React.SetStateAction<Income[]>>;
  results: number;
  setResults: React.Dispatch<React.SetStateAction<number>>;
  loading: boolean;
  setLoading: React.Dispatch<React.SetStateAction<boolean>>;
  refresh: number;
  setRefresh: React.Dispatch<React.SetStateAction<number>>;
  refreshIncomes: () => void;
  createIncome: (income: Income) => Promise<Income>;
  deleteIncome: (income: Income) => Promise<void>;
  updateIncome: (income: Income) => Promise<void>;
}

const IncomesContext = createContext<IncomesContextProps | undefined>(
  undefined
);

export const IncomesProvider: React.FC<{ children: ReactNode }> = ({
  children,
}) => {
  const [incomes, setIncomes] = useState<Income[]>([]);
  const [results, setResults] = useState<number>(0);
  const [loading, setLoading] = useState<boolean>(false);
  const [refresh, setRefresh] = useState<number>(0);

  const refreshIncomes = () => {
    const newRefresh = refresh + 1;
    setRefresh(newRefresh);
  };

  const fetchIncomes = async () => {
    const { incomes, results } = await getIncomesAction();
    if (incomes?.length === 0) {
      setResults(0);
      return;
    }
    if (incomes) {
      setIncomes(incomes);
    }
    if (results) {
      setResults(results);
    }
  };

  const createIncome = async (income: Income) => {
    const newIncome = await createIncomeAction({ income, path: "/incomes" });
    return newIncome;
  };

  const deleteIncome = async (income: Income) => {
    await deleteIncomeAction({ income });
  };

  const updateIncome = async (income: Income) => {
    await updateIncomeAction({ path: `/incomes`, income });
  };

  useEffect(() => {
    fetchIncomes();
  }, [refresh]);

  return (
    <IncomesContext.Provider
      value={{
        incomes,
        setIncomes,
        results,
        setResults,
        loading,
        setLoading,
        refresh,
        setRefresh,
        refreshIncomes,
        createIncome,
        deleteIncome,
        updateIncome,
      }}
    >
      {children}
    </IncomesContext.Provider>
  );
};

export const useIncomesContext = () => {
  const context = useContext(IncomesContext);
  if (!context) {
    throw new Error("useIncomesContext must be used within a ExpensesProvider");
  }
  return context;
};
