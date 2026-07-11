import React, { createContext, useReducer, type ReactNode } from "react";
import type { BundleState } from "../types";
import { bundleReducer, type BundleAction } from "./bundleReducer";
import seedState from "../data/seedState.json";

const STORAGE_KEY = "bundle_builder_state";

interface BundleContextProps {
  state: BundleState;
  dispatch: React.Dispatch<BundleAction>;
  saveForLater: () => void;
}

export const BundleContext = createContext<BundleContextProps | undefined>(
  undefined,
);

export const BundleProvider = ({ children }: { children: ReactNode }) => {
  // Initialize state from local storage or seed
  const getInitialState = (): BundleState => {
    try {
      const saved = window.localStorage.getItem(STORAGE_KEY);
      if (saved) {
        return JSON.parse(saved);
      }
    } catch (e) {
      console.warn("Failed to load state from local storage", e);
    }
    return seedState as BundleState;
  };

  const [state, dispatch] = useReducer(bundleReducer, getInitialState());

  // Save for later functionality
  const saveForLater = () => {
    try {
      window.localStorage.setItem(STORAGE_KEY, JSON.stringify(state));
      alert("Your system has been saved for later!"); // Simple UI feedback for prototype
    } catch (e) {
      console.error("Failed to save state", e);
    }
  };

  return (
    <BundleContext.Provider value={{ state, dispatch, saveForLater }}>
      {children}
    </BundleContext.Provider>
  );
};
