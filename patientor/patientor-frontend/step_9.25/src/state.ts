import { createContext, useContext } from "react";
import { Diagnosis } from "./types";

// Global State type
export type State = {
  diagnoses: Diagnosis[];
};

// Initial State
export const initialState: State = {
  diagnoses: [],
};

// Context stores: [state, dispatch]
export const StateContext = createContext<[State, React.Dispatch<any>]>([
  initialState,
  () => initialState,  // default dispatch
]);

// Hook to access state
export const useStateValue = () => useContext(StateContext);
