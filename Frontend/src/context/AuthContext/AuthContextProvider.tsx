import { type JSX } from "react";
import { AuthContext } from "./AuthContext";
import type { UserType } from "../../utils/commonTypes";

export function AuthProvider({
  user,
  setUser,
  children,
}: {
  user: UserType;
  setUser: React.Dispatch<React.SetStateAction<UserType | null>>;
  children: JSX.Element;
}) {
  return (
    <AuthContext.Provider value={{ user, setUser }}>
      {children}
    </AuthContext.Provider>
  );
}
