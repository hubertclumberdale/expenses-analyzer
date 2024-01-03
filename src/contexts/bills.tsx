import {
  deleteBillAction,
  getBillsAction,
  updateBillAction,
} from "@/actions/bills";
import {
  createExpenseAction as createBillAction,
  deleteExpenseAction,
  getExpensesAction,
  updateExpenseAction,
} from "@/actions/expenses";
import { Bill, Expense } from "@/types/types";
import React, {
  createContext,
  useContext,
  ReactNode,
  useState,
  useEffect,
} from "react";

interface BillsContextProps {
  bills: Bill[];
  setBills: React.Dispatch<React.SetStateAction<Bill[]>>;
  results: number;
  setResults: React.Dispatch<React.SetStateAction<number>>;
  loading: boolean;
  setLoading: React.Dispatch<React.SetStateAction<boolean>>;
  refresh: number;
  setRefresh: React.Dispatch<React.SetStateAction<number>>;
  refreshBills: () => void;
  createBill: (bill: Bill) => Promise<Bill>;
  deleteBill: (bill: Bill) => Promise<void>;
  updateBill: (bill: Bill) => Promise<void>;
}

const BillsContext = createContext<BillsContextProps | undefined>(undefined);

export const BillsProvider: React.FC<{ children: ReactNode }> = ({
  children,
}) => {
  const [bills, setBills] = useState<Bill[]>([]);
  const [results, setResults] = useState<number>(0);
  const [loading, setLoading] = useState<boolean>(false);
  const [refresh, setRefresh] = useState<number>(0);

  const refreshBills = () => {
    const newRefresh = refresh + 1;
    setRefresh(newRefresh);
  };

  const fetchBills = async () => {
    const { bills, results } = await getBillsAction();
    if (bills?.length === 0) {
      setResults(0);
      return;
    }
    if (bills) {
      setBills(bills);
    }
    if (results) {
      setResults(results);
    }
  };

  const createBill = async (bill: Bill) => {
    const newBill = await createBillAction({
      expense: bill,
      path: "/bills",
    });
    return newBill;
  };

  const deleteBill = async (bill: Bill) => {
    await deleteBillAction({ bill, path: "/bills" });
  };

  const updateBill = async (bill: Bill) => {
    await updateBillAction({ path: `/bills`, bill });
  };

  useEffect(() => {
    fetchBills();
  }, [refresh]);

  return (
    <BillsContext.Provider
      value={{
        bills,
        setBills,
        results,
        setResults,
        loading,
        setLoading,
        refresh,
        setRefresh,
        refreshBills,
        createBill,
        deleteBill,
        updateBill,
      }}
    >
      {children}
    </BillsContext.Provider>
  );
};

export const useBillsContext = () => {
  const context = useContext(BillsContext);
  if (!context) {
    throw new Error("useBillsContext must be used within a ExpensesProvider");
  }
  return context;
};
