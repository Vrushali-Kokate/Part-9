import React from "react";
import ReactDOM from "react-dom/client";
import App from "./App";
import { StateContext, initialState } from "./state";

const reducer = (state: any, action: any) => {
  switch (action.type) {
    case "SET_DIAGNOSES":
      return { ...state, diagnoses: action.payload };
    default:
      return state;
  }
};

// FIX: useReducer must be inside a component
const StateProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const value = React.useReducer(reducer, initialState);
  return <StateContext.Provider value={value}>{children}</StateContext.Provider>;
};

ReactDOM.createRoot(document.getElementById("root")!).render(
  <React.StrictMode>
    <StateProvider>
      <App />
    </StateProvider>
  </React.StrictMode>
);
