import { createContext } from "react";

type DisplayContextType = {
  setDisplayItem: (message: string, ok?: boolean) => void;
} | null;

export const DisplayContext = createContext<DisplayContextType>(null);
