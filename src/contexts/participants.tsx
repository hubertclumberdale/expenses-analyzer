import { deleteIncomeAction } from "@/actions/incomes";
import {
  createParticipantAction,
  deleteParticipantAction,
  editParticipantAction,
  getAllParticipantsAction,
  removeAllParticipantsAction,
} from "@/actions/participants";
import { Participant } from "@/types/types";
import React, {
  createContext,
  useContext,
  ReactNode,
  useState,
  useEffect,
} from "react";

interface ParticipantsContextProps {
  participants: Participant[];
  setParticipants: React.Dispatch<React.SetStateAction<Participant[]>>;
  results: number;
  setResults: React.Dispatch<React.SetStateAction<number>>;
  loading: boolean;
  setLoading: React.Dispatch<React.SetStateAction<boolean>>;
  refresh: number;
  setRefresh: React.Dispatch<React.SetStateAction<number>>;
  refreshParticipants: () => void;
  createParticipant: (participant: Participant) => void;
  editParticipant: (participant: Participant) => void;
  getAllParticipants: () => void;
  deleteParticipant: (participant: Participant) => void;
  removeAllParticipants: () => void;
}

const ParticipantsContext = createContext<ParticipantsContextProps | undefined>(
  undefined
);

export const ParticipantsProvider: React.FC<{ children: ReactNode }> = ({
  children,
}) => {
  const [participants, setParticipants] = useState<Participant[]>([]);
  const [results, setResults] = useState<number>(0);
  const [loading, setLoading] = useState<boolean>(false);
  const [refresh, setRefresh] = useState<number>(0);

  const refreshParticipants = () => {
    const newRefresh = refresh + 1;
    setRefresh(newRefresh);
  };

  const createParticipant = async (participant: Participant) => {
    await createParticipantAction(participant);
    await getAllParticipants();
  };

  const editParticipant = async (participant: Participant) => {
    await editParticipantAction(JSON.parse(JSON.stringify(participant)));
    await getAllParticipants();
  };

  const getAllParticipants = async () => {
    try {
      setLoading(true);

      const allParticipants = await getAllParticipantsAction();
      if (allParticipants?.length === 0) {
        setResults(0);
        return;
      }
      setResults(results);
      setParticipants(allParticipants);
    } catch (error) {
      console.error("Error fetching households:", error);
    } finally {
      setLoading(false);
    }
  };

  const removeAllParticipants = async () => {
    try {
      setLoading(true);

      await removeAllParticipantsAction();
      getAllParticipants();
    } catch (error) {
      console.error("Error fetching households:", error);
    } finally {
      setLoading(false);
    }
  };

  const deleteParticipant = async (participant: Participant) => {
    try {
      setLoading(true);
      participant.incomes.forEach(async (income) => {
        await deleteIncomeAction({ income });
      });
      await deleteParticipantAction(participant);
    } catch (error) {
      console.error("Error fetching households:", error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    getAllParticipants();
  }, [refresh]);

  useEffect(() => {
    getAllParticipants();
  }, []);

  return (
    <ParticipantsContext.Provider
      value={{
        participants,
        setParticipants,
        results,
        setResults,
        loading,
        setLoading,
        refresh,
        setRefresh,
        refreshParticipants,
        createParticipant,
        editParticipant,
        getAllParticipants,
        deleteParticipant,
        removeAllParticipants,
      }}
    >
      {children}
    </ParticipantsContext.Provider>
  );
};
export const useParticipantsContext = () => {
  const context = useContext(ParticipantsContext);
  if (!context) {
    throw new Error(
      "useHouseholdContext must be used within a HouseholdsProvider"
    );
  }
  return context;
};
