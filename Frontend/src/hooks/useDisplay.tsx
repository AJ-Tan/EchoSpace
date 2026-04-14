import { useContext } from "react";
import { DisplayContext } from "../context/DisplayContext/DisplayContext";

export function useDisplay() {
  const context = useContext(DisplayContext);
  if (!context) throw new Error("useResponse was used outside of its context.");
  return context;
}
