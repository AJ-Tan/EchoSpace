import { createContext } from "react";
import type { UserType } from "../../types/commonTypes";

type AuthContextType = {
  user: UserType;
  setUser: React.Dispatch<React.SetStateAction<UserType | null>>;
  authNavigation: () => boolean;
  refreshProfile: () => void;
};

export const AuthContext = createContext<AuthContextType | null>(null);
