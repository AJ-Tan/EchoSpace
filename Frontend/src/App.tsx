import { useEffect, useState } from "react";
import "./App.css";
import { AuthProvider } from "./context/AuthContext/AuthContextProvider";
import type { UserType } from "./utils/commonTypes";
import { createHashRouter, RouterProvider } from "react-router";
import { routes } from "./routes/routes";
import { authProtected } from "./services/auth";
import ResponseDisplay from "./components/ResponseDisplay/ResponseDisplay";

function App() {
  const [user, setUser] = useState<UserType>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    authProtected().then((data) => {
      if (data.ok) {
        setUser(data.user);
      }
      setLoading(false);
    });
  }, []);

  if (loading) return <div>Loading...</div>;
  const router = createHashRouter(routes(user));
  return (
    <AuthProvider user={user} setUser={setUser}>
      <ResponseDisplay />
      <RouterProvider router={router} />
    </AuthProvider>
  );
}

export default App;
