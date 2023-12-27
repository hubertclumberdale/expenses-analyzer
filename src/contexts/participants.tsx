import {
  createParticipantAction,
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
  createParticipant: (household: Participant) => void;
  getAllParticipants: () => void;
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
    await createParticipantAction(JSON.parse(JSON.stringify(participant)));
    await getAllParticipants();
  };

  const editParticipant = async (participant: Participant) => {};

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
        getAllParticipants,
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