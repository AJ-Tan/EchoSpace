import { useState, type JSX } from "react";
import { AuthContext } from "./AuthContext";
import type { UserType } from "../../types/commonTypes";

export function AuthProvider({ children }: { children: JSX.Element }) {
  const [user, setUser] = useState<UserType>(null);

  const authNavigation = () => {
    if (user) {
      return true;
    } else {
      return false;
    }
  };

  return (
    <AuthContext.Provider value={{ user, setUser, authNavigation }}>
      {children}
    </AuthContext.Provider>
  );
}
