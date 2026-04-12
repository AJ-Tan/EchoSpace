import { Navigate } from "react-router";
import type { UserType } from "../utils/commonTypes";
import type { JSX } from "react";

type ProtectedRouteProps = {
  user: UserType;
  children: JSX.Element;
};

function ProtectedRoute({ user, children }: ProtectedRouteProps) {
  if (!user) return <Navigate to="/signin" replace />;
  return children;
}

export default ProtectedRoute;
