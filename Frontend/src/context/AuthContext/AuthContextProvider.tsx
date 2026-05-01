import { useState, type JSX } from "react";
import { AuthContext } from "./AuthContext";
import type { UserType } from "../../types/commonTypes";
import { authProtected } from "../../services/auth";

export function AuthContextProvider({ children }: { children: JSX.Element }) {
  const [user, setUser] = useState<UserType>(null);

  const authNavigation = () => {
    if (user) {
      return true;
    } else {
      return false;
    }
  };

  const refreshProfile = async () => {
    const data = await authProtected();
    if (!data.ok) {
      return console.log(data);
    }
    setUser(data.user);
  };

  return (
    <AuthContext value={{ user, setUser, authNavigation, refreshProfile }}>
      {children}
    </AuthContext>
  );
}
