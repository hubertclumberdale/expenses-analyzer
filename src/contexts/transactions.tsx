import {
  createTransactionAction,
  deleteTransactionAction,
  getTransactionsActions,
  updateTransactionAction,
} from "@/actions/transactions";
import { useSpinnerContext } from "@/contexts/spinner";
import { Transaction } from "@/types/types";
import { Types } from "mongoose";
import React, {
  createContext,
  useContext,
  ReactNode,
  useState,
  useEffect,
} from "react";

interface TransactionsContextProps {
  transactions: Transaction[];
  setTransactions: React.Dispatch<React.SetStateAction<Transaction[]>>;
  results: number;
  setResults: React.Dispatch<React.SetStateAction<number>>;
  loading: boolean;
  setLoading: React.Dispatch<React.SetStateAction<boolean>>;
  refresh: number;
  setRefresh: React.Dispatch<React.SetStateAction<number>>;
  refreshTransactions: () => void;
  createTransaction: (transaction: Transaction) => Promise<Transaction>;
  deleteTransaction: (id: string) => Promise<void>;
  updateTransaction: (transaction: Transaction) => Promise<void>;
}

const TransactionsContext = createContext<TransactionsContextProps | undefined>(
  undefined
);

export const TransactionsProvider: React.FC<{ children: ReactNode }> = ({
  children,
}) => {
  const { incrementCounter, decrementCounter } = useSpinnerContext();

  const [transactions, setTransactions] = useState<Transaction[]>([]);
  const [results, setResults] = useState<number>(0);
  const [loading, setLoading] = useState<boolean>(false);
  const [refresh, setRefresh] = useState<number>(0);

  const refreshTransactions = () => {
    const newRefresh = refresh + 1;
    setRefresh(newRefresh);
  };

  const fetchTransactions = async () => {
    incrementCounter();
    const { transactions, results } = await getTransactionsActions();
    if (transactions?.length === 0) {
      setResults(0);
      return;
    }
    if (transactions) {
      setTransactions(transactions);
    }
    if (results) {
      setResults(results);
    }
    decrementCounter();
  };

  const createTransaction = async (transaction: Transaction) => {
    incrementCounter();
    const newTransaction = await createTransactionAction({
      transaction,
      path: "/expenses",
    });
    decrementCounter();
    return newTransaction;
  };

  const deleteTransaction = async (id: string) => {
    incrementCounter();
    await deleteTransactionAction({ id, path: "/expenses" });
    decrementCounter();
  };

  const updateTransaction = async (transaction: Transaction) => {
    incrementCounter();
    await updateTransactionAction({ path: `/expenses`, transaction });
    decrementCounter();
  };

  useEffect(() => {
    fetchTransactions();
  }, [refresh]);

  return (
    <TransactionsContext.Provider
      value={{
        transactions,
        setTransactions,
        results,
        setResults,
        loading,
        setLoading,
        refresh,
        setRefresh,
        refreshTransactions,
        createTransaction,
        deleteTransaction,
        updateTransaction,
      }}
    >
      {children}
    </TransactionsContext.Provider>
  );
};

export const useTransactionsContext = () => {
  const context = useContext(TransactionsContext);
  if (!context) {
    throw new Error(
      "useIncomesContext must be used within a TransactionsProvider"
    );
  }
  return context;
};
