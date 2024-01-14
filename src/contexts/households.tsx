import {
  createHouseholdAction,
  editHouseholdAction,
  getAllHouseholdsAction,
  getHouseholdAction,
  removeAllHouseholdsAction,
} from "@/actions/household";
import { useSpinnerContext } from "@/contexts/spinner";
import { Household } from "@/types/types";
import React, {
  createContext,
  useContext,
  ReactNode,
  useState,
  useEffect,
} from "react";

interface HouseholdsContextProps {
  households: Household[];
  setHouseholds: React.Dispatch<React.SetStateAction<Household[]>>;
  results: number;
  setResults: React.Dispatch<React.SetStateAction<number>>;
  loading: boolean;
  setLoading: React.Dispatch<React.SetStateAction<boolean>>;
  refresh: number;
  setRefresh: React.Dispatch<React.SetStateAction<number>>;
  refreshHouseholds: () => void;
  createHousehold: (household: Household) => void;
  editHousehold: (household: Household) => void;
  getAllHouseholds: () => void;
  fetchSingleHousehold: (id: string) => Promise<Household>;
  removeAllHouseholds: () => void;
}

const HouseholdContext = createContext<HouseholdsContextProps | undefined>(
  undefined
);

export const HouseholdsProvider: React.FC<{ children: ReactNode }> = ({
  children,
}) => {
  const { incrementCounter, decrementCounter } = useSpinnerContext();

  const [households, setHouseholds] = useState<Household[]>([]);
  const [results, setResults] = useState<number>(0);
  const [loading, setLoading] = useState<boolean>(false);
  const [refresh, setRefresh] = useState<number>(0);

  const refreshHouseholds = () => {
    const newRefresh = refresh + 1;
    setRefresh(newRefresh);
  };

  const fetchHouseholds = async () => {
    incrementCounter();
    const { households, results } = await getAllHouseholdsAction();
    if (households?.length === 0) {
      setResults(0);
      return;
    }
    if (households) {
      setHouseholds([...households]);
    }
    if (results) {
      setResults(results);
    }
    decrementCounter();
  };

  const fetchSingleHousehold = async (id: string) => {
    const household = await getHouseholdAction(id);
    if (household) {
      return household;
    }
  };

  const createHousehold = async (household: Household) => {
    await createHouseholdAction(household);
    await getAllHouseholds();
  };

  const editHousehold = async (household: Household) => {
    await editHouseholdAction(household);
    await getAllHouseholds();
  };

  const getAllHouseholds = async () => {
    try {
      incrementCounter();
      setLoading(true);
      const allHouseholds = await getAllHouseholdsAction();
      if (allHouseholds?.length === 0) {
        setResults(0);
        return;
      }
      setResults(results);
      setHouseholds(allHouseholds);
    } catch (error) {
      console.error("Error fetching households:", error);
    } finally {
      setLoading(false);
      decrementCounter();
    }
  };

  const removeAllHouseholds = async () => {
    try {
      incrementCounter();

      setLoading(true);

      await removeAllHouseholdsAction();
      getAllHouseholds();
    } catch (error) {
      console.error("Error fetching households:", error);
    } finally {
      setLoading(false);
      decrementCounter();
    }
  };

  useEffect(() => {
    if (refresh > 0) {
      fetchHouseholds();
    }
  }, [refresh]);

  useEffect(() => {
    getAllHouseholds();
  }, []);

  return (
    <HouseholdContext.Provider
      value={{
        households,
        setHouseholds,
        results,
        setResults,
        loading,
        setLoading,
        refresh,
        setRefresh,
        refreshHouseholds,
        createHousehold,
        editHousehold,
        getAllHouseholds,
        fetchSingleHousehold,
        removeAllHouseholds,
      }}
    >
      {children}
    </HouseholdContext.Provider>
  );
};
export const useHouseholdContext = () => {
  const context = useContext(HouseholdContext);
  if (!context) {
    throw new Error(
      "useHouseholdContext must be used within a HouseholdsProvider"
    );
  }
  return context;
};
