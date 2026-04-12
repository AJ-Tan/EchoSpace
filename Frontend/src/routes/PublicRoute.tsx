import { Navigate } from "react-router";
import type { UserType } from "../utils/commonTypes";
import type { JSX } from "react";

type PublicRouteProps = {
  user: UserType;
  children: JSX.Element;
};

function PublicRoute({ user, children }: PublicRouteProps) {
  if (user) return <Navigate to="/" replace />;
  return children;
}

export default PublicRoute;
