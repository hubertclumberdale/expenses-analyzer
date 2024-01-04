import {
  createTransactionAction,
  deleteTransactionAction,
  getTransactionsActions,
  updateTransactionAction,
} from "@/actions/transactions";
import { Transaction } from "@/types/types";
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
  deleteTransaction: (transaction: Transaction) => Promise<void>;
  updateTransaction: (transaction: Transaction) => Promise<void>;
}

const TransactionsContext = createContext<TransactionsContextProps | undefined>(
  undefined
);

export const TransactionsProvider: React.FC<{ children: ReactNode }> = ({
  children,
}) => {
  const [transactions, setTransactions] = useState<Transaction[]>([]);
  const [results, setResults] = useState<number>(0);
  const [loading, setLoading] = useState<boolean>(false);
  const [refresh, setRefresh] = useState<number>(0);

  const refreshTransactions = () => {
    const newRefresh = refresh + 1;
    setRefresh(newRefresh);
  };

  const fetchTransactions = async () => {
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
  };

  const createTransaction = async (transaction: Transaction) => {
    const newTransaction = await createTransactionAction({
      transaction,
      path: "/expenses",
    });
    return newTransaction;
  };

  const deleteTransaction = async (transaction: Transaction) => {
    await deleteTransactionAction({ transaction, path: "/expenses" });
  };

  const updateTransaction = async (transaction: Transaction) => {
    await updateTransactionAction({ path: `/expenses`, transaction });
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
