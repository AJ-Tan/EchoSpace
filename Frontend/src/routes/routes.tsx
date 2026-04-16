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

type RoutesType = (user: UserType) => RouteObject[];

export const routes: RoutesType = (user) => {
  return [
    {
      path: "/",
      element: <AppLayout />,
      children: [
        {
          path: "/",
          element: <Home />,
        },
        {
          path: "/profile",
          element: <Profile />,
        },
        {
          path: "/history",
          element: <History />,
        },
        {
          path: "/message",
          element: <Message />,
        },
      ],
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
