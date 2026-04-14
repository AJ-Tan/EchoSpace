import { Navigate } from "react-router";
import type { JSX } from "react";
import type { UserType } from "../types/commonTypes";

type ProtectedRouteProps = {
  user: UserType;
  children: JSX.Element;
};

function ProtectedRoute({ user, children }: ProtectedRouteProps) {
  if (!user) return <Navigate to="/signin" replace />;
  return children;
}

export default ProtectedRoute;
