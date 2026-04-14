import { createContext } from "react";
import type { DisplayItemType } from "../../types/commonTypes";

type DisplayContextType = {
  setDisplayList: React.Dispatch<React.SetStateAction<DisplayItemType[]>>;
} | null;

export const DisplayContext = createContext<DisplayContextType>(null);
