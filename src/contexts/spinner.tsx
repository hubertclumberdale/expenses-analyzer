import React, { createContext, useContext, ReactNode, useState } from "react";
import { ClipLoader } from "react-spinners";

interface SpinnerContextProps {
  incrementCounter: () => void;
  decrementCounter: () => void;
}

const SpinnerContext = createContext<SpinnerContextProps | undefined>(
  undefined
);

export const SpinnerProvider: React.FC<{ children: ReactNode }> = ({
  children,
}) => {
  const [counter, setCounter] = useState(0);

  const incrementCounter = () => {
    console.log("incrementCounter");
    setCounter(counter + 1);
  };
  const decrementCounter = () => {
    console.log("decrementCounter");
    if (counter < 0) {
      setCounter(0);
      return;
    }
    setCounter(counter - 1);
  };

  return (
    <SpinnerContext.Provider value={{ incrementCounter, decrementCounter }}>
      <div
        style={{
          width: "100%",
          height: "100%",
          position: "fixed",
          top: "50%",
          left: "50%",
          transform: "translate(-50%, -50%)",
          zIndex: 9999,
          display: counter > 0 ? "flex" : "none",
          backgroundColor: "rgba(0, 0, 0, 0.5)",
          flexDirection: "column",
          justifyContent: "center",
          alignItems: "center",
          transition: "all 0.5s ease",
        }}
      >
        <ClipLoader
          cssOverride={{
            display: "block",
            margin: "0 auto",
          }}
          color="#fffff"
          loading={true}
          size={150}
          aria-label="Loading Spinner"
          data-testid="loader"
        />
      </div>
      {children}
    </SpinnerContext.Provider>
  );
};

export const useSpinnerContext = () => {
  const context = useContext(SpinnerContext);
  if (!context) {
    throw new Error(
      "useSpinnerContext must be used within a TransactionsProvider"
    );
  }
  return context;
};
