import { useContext } from "react";
import { AuthContext } from "../context/AuthContext/AuthContext";

export function useAuth() {
  const context = useContext(AuthContext);
  if (!context) throw new Error("useAuth was used outside of provider.");
  return context;
}
