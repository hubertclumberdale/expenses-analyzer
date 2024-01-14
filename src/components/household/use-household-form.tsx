// UseHouseholdForm.ts
import { useEffect, useState } from "react";
import {
  Bill,
  Expense,
  Household,
  Participant,
  Transaction,
} from "@/types/types";
import { useHouseholdContext } from "@/contexts/households";
import { useTransactionsContext } from "@/contexts/transactions";
import { debounce } from "lodash";

export const useHouseholdForm = (household: Household) => {
  const [initialized, setInitialized] = useState<boolean>(false);
  const { editHousehold, refreshHouseholds } = useHouseholdContext();

  const { updateTransaction, createTransaction, deleteTransaction } =
    useTransactionsContext();
  const [editedHousehold, setEditedHousehold] = useState<Household>({
    name: "",
    participants: [],
    expenses: [],
    refunds: [],
  });

  useEffect(() => {
    if (!initialized && household._id) {
      setEditedHousehold(household);
      setInitialized(true);
    }
  }, [household]);

  useEffect(() => {
    if (!initialized) {
      return;
    }
    debouncedSave();

    return () => {
      debouncedSave.cancel();
    };
  }, [
    editedHousehold.name,
    editedHousehold.participants.length,
    editedHousehold.expenses.length,
    editedHousehold.refunds.length,
  ]);

  const debouncedSave = debounce(() => {
    save();
  }, 300);

  const save = () => {
    if (!editedHousehold._id) {
      return;
    }
    console.log("Saving household", editedHousehold);
    editHousehold(editedHousehold);
    refreshHouseholds();
  };

  const updateName = (e: React.ChangeEvent<HTMLInputElement>) => {
    console.log("updateName");
    const { name, value } = e.target;
    setEditedHousehold((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const addParticipant = (participant: Participant) => {
    console.log("addParticipant");
    if (participant) {
      setEditedHousehold((prev) => ({
        ...prev,
        participants: [...prev.participants, participant],
      }));
    }
  };

  const removeParticipant = ({ index }: { index: number }) => {
    console.log("removeParticipant");
    const newParticipants = [...editedHousehold.participants];
    newParticipants.splice(index, 1);
    setEditedHousehold((prev) => ({
      ...prev,
      participants: newParticipants,
    }));
  };

  const addBills = async (bills: Bill[]) => {
    const createdBills: Bill[] = [];
    for (const bill of bills) {
      const createdBill = await createTransaction(bill);
      if (createdBill?._id) {
        createdBills.push(createdBill as Bill);
      }
    }
    setEditedHousehold((prev) => ({
      ...prev,
      expenses: [...prev.expenses, ...createdBills],
    }));
  };

  const updateBill = (bill: Bill) => {
    console.log("updateBill");
    updateTransaction(bill);
  };

  const removeBill = (id: string) => {
    console.log("removeBill");
    deleteTransaction(id);
    setEditedHousehold((prev) => ({
      ...prev,
      expenses: prev.expenses.filter((expense) => expense._id !== id),
    }));
  };

  const addExpenses = async (expenses: Expense[]) => {
    console.log("addExpenses");
    const createdExpenses: Expense[] = [];
    for (const expense of expenses) {
      const createdExpense = await createTransaction(expense);
      if (createdExpense?._id) {
        createdExpenses.push(createdExpense as Expense);
      }
    }
    setEditedHousehold((prev) => ({
      ...prev,
      expenses: [...prev.expenses, ...createdExpenses],
    }));
  };

  const updateExpense = (expense: Expense) => {
    console.log("updateExpense");
    updateTransaction(expense);
  };

  const removeExpense = (id: string) => {
    console.log("removeExpense");
    deleteTransaction(id);
    setEditedHousehold((prev) => ({
      ...prev,
      expenses: prev.expenses.filter((expense) => expense._id !== id),
    }));
  };

  const addRefunds = async (refunds: Transaction[]) => {
    console.log("addRefunds");
    const createdRefunds: Transaction[] = [];
    for (const refund of refunds) {
      const createdRefund = await createTransaction(refund);
      if (createdRefund?._id) {
        createdRefunds.push(createdRefund as Transaction);
      }
    }
    setEditedHousehold((prev) => ({
      ...prev,
      refunds: [...prev.refunds, ...createdRefunds],
    }));
  };

  const updateRefund = (refund: Transaction) => {
    console.log("updateRefund");
    console.log(refund);
    updateTransaction(refund);
  };

  const removeRefund = (id: string) => {
    console.log("removeRefund");
    deleteTransaction(id);
    setEditedHousehold((prev) => ({
      ...prev,
      refunds: prev.refunds.filter((refund) => refund._id !== id),
    }));
  };

  return {
    editedHousehold,
    updateName,
    addParticipant,
    removeParticipant,
    addBills,
    updateBill,
    removeBill,
    addExpenses,
    updateExpense,
    removeExpense,
    addRefunds,
    updateRefund,
    removeRefund,
  };
};
