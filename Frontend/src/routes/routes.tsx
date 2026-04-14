import type { RouteObject } from "react-router";
import type { UserType } from "../types/commonTypes";
import PublicRoute from "./PublicRoute";
import SignIn from "../pages/SignIn/SignIn";
import ProtectedRoute from "./ProtectedRoute";
import Dashboard from "../pages/Dashboard/Dashboard";
import SignUp from "../pages/SignUp/SignUp";

type RoutesType = (user: UserType) => RouteObject[];

export const routes: RoutesType = (user) => {
  return [
    {
      path: "/",
      element: (
        <ProtectedRoute user={user}>
          <Dashboard />
        </ProtectedRoute>
      ),
    },
    {
      path: "/signin",
      element: (
        <PublicRoute user={user}>
          <SignIn />
        </PublicRoute>
      ),
    },
    {
      path: "/signup",
      element: (
        <PublicRoute user={user}>
          <SignUp />
        </PublicRoute>
      ),
    },
  ];
};
