import { createContext } from "react";
import type { UserType } from "../../utils/commonTypes";

type AuthContextType = {
  user: UserType;
  setUser: React.Dispatch<React.SetStateAction<UserType | null>>;
};

export const AuthContext = createContext<AuthContextType | null>(null);
