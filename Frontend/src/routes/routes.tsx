import type { RouteObject } from "react-router";
import type { UserType } from "../types/commonTypes";
import PublicRoute from "./PublicRoute";
import SignIn from "../pages/SignIn/SignIn";
import SignUp from "../pages/SignUp/SignUp";
import AppLayout from "../layout/app-layout/AppLayout";
import Home from "../pages/App/Home/Home";
import Profile from "../pages/App/Profile/Profile";
import Message from "../pages/App/Message/Message";
import History from "../pages/App/History/History";
import AuthLayout from "../layout/auth-layout/AuthLayout";
import ProtectedRoute from "./ProtectedRoute";
import ErrorPage from "../pages/ErrorPage/ErrorPage";

type RoutesType = (user: UserType) => RouteObject[];

export const routes: RoutesType = (user) => {
  return [
    {
      path: "/",
      element: <AppLayout />,
      errorElement: <ErrorPage />,
      children: [
        {
          path: "/",
          element: <Home />,
        },
        {
          path: "/profile",
          element: (
            <ProtectedRoute user={user}>
              <Profile />
            </ProtectedRoute>
          ),
        },
        {
          path: "/history",
          element: (
            <ProtectedRoute user={user}>
              <History />
            </ProtectedRoute>
          ),
        },
        {
          path: "/message",
          element: <Message />,
        },
      ],
    },
    {
      path: "/auth",
      element: <AuthLayout />,
      children: [
        {
          path: "/auth",
          element: <SignIn />,
        },
        {
          path: "/auth/signin",
          element: (
            <PublicRoute user={user}>
              <SignIn />
            </PublicRoute>
          ),
        },
        {
          path: "/auth/signup",
          element: (
            <PublicRoute user={user}>
              <SignUp />
            </PublicRoute>
          ),
        },
      ],
    },
  ];
};
